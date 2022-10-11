import { createContext, useEffect, useRef, useState } from 'react'
import { unionBy } from 'lodash'
import axios from 'axios'
import { PromoCode } from 'interfaces/Promo'
import { useUser } from 'data/useUser'
import moment from 'moment'
import { ajax } from 'rxjs/ajax'
import { Subject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { getPromoAmount, priceHelper } from 'utils/helper'
import { SliceBoxCart, SliceBoxOption } from 'interfaces/SliceBox'
import { v4 as uuidv4 } from 'uuid'
import { produce } from 'immer'
import { getFlatCart } from 'lib/getFlatCart'
import { Bundle } from 'interfaces/Bundle'
import { BundleFormValues } from '@/components/Bundles/BundleForm/BundleFormValues'

interface Props {
	message: string
	setMessage: (message: string) => void
	messageType?: 'INFO' | 'ALERT'
	setMessageType?: (type: 'INFO' | 'ALERT') => void
	cart?: any[]
	summary?: any
	authenticationCallback?: (any) => void
	setDeliveryMethod?: (any) => void
	updateQtyByIds: (id: string, qty: number) => void
	removeByIds: (id: string) => void

	// items which were supposed to checkout
	setCheckoutItems?: (any) => void
	checkoutItems?: any

	// stripeData
	clientSecret: string
	setClientSecret: (string) => void

	// slicebox
	addSliceBoxToCart: (
		option: SliceBoxOption,
		products: SliceBoxCart[]
	) => void

	// bundle
	addBundleToCart: (bundle: Bundle, values: BundleFormValues) => void

	orderData: any
	setOrderData: (any) => void

	addToCart?: (cart: any) => void
	updateItemFromCart?: (cart: any) => void
	removeItemFromCart?: (cartId: string) => void
	clearCart?: () => void
	//
	setAuthenticationCallback?: (any) => void

	// check whether all of the cart items have valid deliverable dates
	checkCartItemsHaveDeliverableDate: boolean
	toggleValidDeliveryDate: (value: boolean) => void

	orderPayload: any
	setOrderPayload: (any) => void

	appliedPromo: PromoCode
	setAppliedPromo: (promoCode: PromoCode) => void

	discount: number

	checkoutFormStep1Temp: any
	setCheckoutFormStep1Temp: (any) => void

	redirectLinkAfterRegister: string
	setRedirectLinkAfterRegister: (string) => void
}

export const ApplicationContext = createContext<Props | undefined>(undefined)

/**
 * utilities for cart items inside local storage
 */
const cartName = 'cart_items'
const getCartFromLocalStorage = () =>
	localStorage.getItem(cartName)
		? JSON.parse(localStorage.getItem(cartName))?.filter(
				(item) => moment().diff(moment(item.addCartAt), 'hour') < 24
		  )
		: []
const setCartAtLocalStorage = (items: any[]) =>
	localStorage.setItem(cartName, JSON.stringify(items))

/**
 * Application context provider for handling states
 * @param children
 * @constructor
 */
const ApplicationContextProvider = function ({ children }) {
	const cart$ = useRef(new Subject())

	const [message, setMessage] = useState('')
	const [messageType, setMessageType] = useState<'INFO' | 'ALERT'>('INFO')
	const [validDeliveryDate, toggleValidDeliveryDate] = useState(true)

	// cart items at local storage
	const [cart, mutateCart] = useState<any[]>([])
	const [deliveryMethod, mutateDeliveryMethod] = useState(null)
	// secret for stripe payment
	const [clientSecret, setClientSecret] = useState(null)
	// set order data after the order first step was resolved from api
	const [orderData, setOrderData] = useState(null)
	// save order payload before the payment is made
	const [orderPayload, setOrderPayload] = useState(null)

	// temporary store the form data and reshow if the user visit again
	const [checkoutFormStep1Temp, setCheckoutFormStep1Temp] = useState(null)

	const [summary, setSummary] = useState({
		deliveryFee: 0,
		deliveryDiscount: 0,
		freeDelivery: false,
		productsAmount: 0,
		deliverableDates: [],
	})

	const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)

	const [discount, setDiscount] = useState<number>(0)

	const [redirectLinkAfterRegister, setRedirectLinkAfterRegister] = useState(
		'/'
	)

	const { user } = useUser({ redirectTo: null })

	useEffect(() => {
		mutateCart(getCartFromLocalStorage())
	}, [])

	useEffect(() => {
		function onFocus() {
			mutateCart(getCartFromLocalStorage())
		}

		window.addEventListener('focus', onFocus)

		return () => {
			window.removeEventListener('focus', onFocus)
		}
	}, [])

	// rxjs for calc summary when cart was updated
	useEffect(() => {
		const subscription = cart$.current
			.pipe(
				switchMap((value: any) => {
					return ajax({
						url: `${process.env.API_URL}/orders/calc_summary`,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: {
							cart: getFlatCart(value),
							bundles: value
								.filter((item) => item.type === 'bundle')
								.map((item) => ({
									bundle: item.bundle._id,
									quantity: item.quantity,
								})),
						},
					})
				})
			)
			.subscribe(({ response }) => {
				// find one of the valid delivery date and ensure all products in cart items have delivery date
				// toggleValidDeliveryDate(
				// 	response?.deliverableDates?.some((x) => x.valid) || false
				// )

				setSummary((prevState) => ({ ...prevState, ...response }))
			})

		return () => {
			subscription.unsubscribe()
		}
	}, [cart$])

	// sync with local storage everytime cart was updated
	useEffect(() => {
		const fetchSummary = async () => {
			if (cart.length === 0) {
				return
			}

			cart$.current.next(cart)
		}

		const updateCart = async (token) => {
			await axios.post(
				`${process.env.API_URL}/auth/me/cart`,
				{ cart },
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
		}

		setCartAtLocalStorage(cart)

		if (user?.isLoggedIn && user?.token) {
			updateCart(user?.token)
		}

		fetchSummary()
	}, [cart, user])

	// for delivery fee calculation
	useEffect(() => {
		async function fetchDeliveryFee(payload) {
			const { data } = await axios.post(
				`${process.env.API_URL}/orders/calc_deliveryFee`,
				payload
			)

			setSummary((prevState) => ({ ...prevState, deliveryFee: data }))
		}

		if (deliveryMethod) {
			fetchDeliveryFee(deliveryMethod)
		}
	}, [deliveryMethod])

	// calc discount of promo code
	useEffect(() => {
		if (appliedPromo) {
			let deliveryFee = summary.deliveryFee || 0

			// if free delivery min spending mode
			if (summary.deliveryDiscount > 0 || summary.freeDelivery) {
				deliveryFee = 0
			}

			const discount = priceHelper(
				getPromoAmount(
					appliedPromo,
					summary.productsAmount +
						(appliedPromo.isIncludeDeliveryFee ? deliveryFee : 0)
				)
			)

			setDiscount(parseFloat(discount))
		}
	}, [appliedPromo, summary])

	// dispatch actions for mutating items inside the context
	function addToCart(item) {
		const found = cart.find(
			(x) =>
				x.product_id === item.product_id &&
				x.variantProduct?._id === item.variantProduct?._id
		)
		// check item is already inside the cart, and add quantity to existed one
		if (found) {
			found.quantity = found.quantity + item.quantity
			found.addCartAt = new Date()
			mutateCart(unionBy([found], [...cart], 'product_id'))
		} else {
			mutateCart([...cart, { ...item, addCartAt: new Date() }])
		}
	}

	function addSliceBoxToCart(
		option: SliceBoxOption,
		products: SliceBoxCart[]
	) {
		mutateCart([
			...cart,
			{
				id: uuidv4(),
				option,
				products,
				quantity: 1,
				type: 'slice-box',
				addCartAt: new Date(),
			},
		])
	}

	function addBundleToCart(bundle: Bundle, values: BundleFormValues) {
		mutateCart([
			...cart,
			{
				id: uuidv4(),
				bundle,
				quantity: values.quantity,
				values: values,
				type: 'bundle',
				addCartAt: new Date(),
			},
		])
	}

	function updateQtyByIds(id: string, qty: number) {
		mutateCart(
			produce(cart, (draft) => {
				const existed = draft.findIndex((item) => item.id === id)

				if (existed > -1) {
					draft[existed].quantity = qty
				}
			})
		)
	}

	function removeByIds(id: string) {
		mutateCart(
			produce(cart, (draft) => {
				return draft.filter((item) => item.id !== id)
			})
		)
	}

	// this might be useful for directly update the quantity or entire attributes of specific product
	function updateItemFromCart(item) {
		// TODO: refactor with more optimized way than this one
		mutateCart(
			cart.map((i) => (i.product_id === item.product_id ? item : i))
		)
	}

	function removeItemFromCart(itemId) {
		mutateCart(cart.filter((item) => item.product_id !== itemId))
	}

	function clearCart() {
		mutateCart([])
		setAppliedPromo(null)
		setCheckoutFormStep1Temp(null)
	}

	return (
		<ApplicationContext.Provider
			value={{
				message,
				setMessage,
				messageType,
				setMessageType,
				cart,
				summary,
				addToCart,
				updateItemFromCart,
				removeItemFromCart,
				clearCart,
				setDeliveryMethod: mutateDeliveryMethod,
				updateQtyByIds,
				removeByIds,

				//	stripe data
				clientSecret,
				setClientSecret,

				orderData,
				setOrderData,

				checkCartItemsHaveDeliverableDate: validDeliveryDate,
				toggleValidDeliveryDate,

				// order
				orderPayload,
				setOrderPayload,

				// slicebox
				addSliceBoxToCart,

				// bundle
				addBundleToCart,

				// promo
				appliedPromo,
				setAppliedPromo,

				// discount
				discount,

				// checkout form step 1 temporary
				checkoutFormStep1Temp,
				setCheckoutFormStep1Temp,

				redirectLinkAfterRegister,
				setRedirectLinkAfterRegister,
			}}
		>
			{children}
		</ApplicationContext.Provider>
	)
}

export default ApplicationContextProvider
