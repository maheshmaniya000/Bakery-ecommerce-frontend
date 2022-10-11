import { useContext } from 'react'
import { StyledLoginForm } from '@/styles/pages/checkout.style'
import { useRouter } from 'next/router'

import { Anchor } from '@/styles/elements'
import { CheckoutForm } from '@/components/Checkout/CheckoutFormStep1/CheckoutForm/CheckoutForm'
import { StyledPageHeading } from '@/styles/elements/typography'
import { useUser } from '../../../data/useUser'
// import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'
import { ApplicationContext } from '../../../context/ApplicationContext'

interface Props {
	cart?: any
	orderData?: any
	formRef: any
	goToReview: (payload: any) => void
	// trigger once checkout form 1 is complete
}
export const CheckoutFormStep1: React.FC<Props> = ({
	cart,
	formRef,
	orderData,
	goToReview,
}) => {
	const router = useRouter()
	// const [error, setError] = useState('')
	const { user } = useUser({})

	const {
		setOrderPayload,
		appliedPromo,
		setRedirectLinkAfterRegister,
	} = useContext(ApplicationContext)

	const handleSubmit = (values) => {
		const products = orderData?._id
			? orderData.products
			: cart
					.filter((item) => item.type === undefined)
					.map((item) => {
						return {
							productId: item.product_id,
							qty: item.quantity,
							variantId: item.variantProduct
								? item.variantProduct._id
								: undefined,
							candles: item.candles,
							knifes: item.knifes,
							message: item.message,
						}
					})

		const sliceBoxes = cart
			.filter((item) => item.type === 'slice-box')
			.map((item) => ({
				qty: item.quantity,
				option: item.option._id,
				products: item.products.map((_product) => ({
					qty: _product.qty,
					product: _product.product._id,
				})),
			}))

		const bundles = cart
			.filter((item) => item.type === 'bundle')
			.map((item) => ({
				bundle: item.bundle._id,
				quantity: item.quantity,
				products: item.values.products.map((item) => ({
					product: item._id,
					cakeText: item.cakeText,
					candles: item.candles.value,
					knife: item.knife.value,
				})),
			}))

		const payload = {
			...(user.isLoggedIn && { customerId: user._id }),
			usedCode: appliedPromo?.usedCode || '',
			orderDate: values.orderDate.date,
			delivery: {
				methodId: values.method._id,
				specificId: values.preferredTime
					? values.preferredTime
					: undefined,
				address: values.address,
				buildingUnitNo: values.buildingNo,
				postalCode: values.postalCode,
			},
			recipient: {
				firstName: values.recipientFirstName,
				lastName: values.recipientLastName,
				mobileNo: values.recipientMobileNo,
			},
			sender: {
				firstName: values.senderFirstName,
				lastName: values.senderLastName,
				mobileNo: values.senderMobileNo,
				email: values.senderEmail,
			},
			products,
			sliceBoxes,
			bundles,
		}
		setOrderPayload(payload)
		// const action = orderData?._id
		// 	? editOrder(orderData._id, payload)
		// 	: order(payload)
		// action
		// 	.then((res) => {
		// 		scrollToTop()
		// 		// if order is not supposed to update, clear the cart once the api response was resolved
		// 		if (!orderData?._id) {
		// 			clearCart()
		// 		}
		// 		router.push('/checkout/' + res.data._id)
		// 	})
		// 	.catch((err) => {
		// 		scrollToTop()
		// 		setError(extractErrorMessage(err))
		// 	})

		goToReview(payload)
	}

	const onClickLogin = () => {
		setRedirectLinkAfterRegister('/checkout')
		router.push('/?action=sign-in')
	}

	return (
		<>
			<StyledPageHeading size="1.8rem">Delivery</StyledPageHeading>
			{!user?.isLoggedIn && (
				<StyledLoginForm>
					Already have an account?{' '}
					<Anchor
						isUnderline={true}
						onClick={(e) => {
							e.preventDefault()
							onClickLogin()
						}}
					>
						Log in here
					</Anchor>
				</StyledLoginForm>
			)}

			<h3 className="page-heading">
				When do you wish to get your order?
			</h3>

			{/* {error && (
				<StyledNoticeContainer>
					<ErrorHandler message={error} />
				</StyledNoticeContainer>
			)} */}

			<CheckoutForm
				formRef={formRef}
				submit={(values) => handleSubmit(values)}
				orderData={orderData}
			/>
		</>
	)
}
