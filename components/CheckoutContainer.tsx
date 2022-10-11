import { useContext, useEffect, useRef, useState } from 'react'
import { OrderSteps } from '@/components/OrderSteps/OrderSteps'
import {
	StyledPageContainer,
	StyledSummaryContainer,
} from '@/styles/elements/container'
import { StyledCheckoutContainer } from '@/styles/pages/checkout.style'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary/CheckoutSummary'
import { ApplicationContext } from '../context/ApplicationContext'
import { CheckoutFormStep1 } from '@/components/Checkout/CheckoutFormStep1/CheckoutFormStep1'
import DeliveryInfo from '@/components/Checkout/DeliveryInfo/DeliveryInfo'
import { Payment } from '@/components/Checkout/Payment/Payment'
import { OrderSummary } from '@/components/Checkout/OrderSummary/OrderSummary'
import { RequestForRegister } from '@/components/Checkout/RequestForRegister/RequestForRegister'
import { useRouter } from 'next/router'
import { useUser } from '../data/useUser'
import { priceHelper, scrollToTop } from 'utils/helper'
import { order } from 'services/checkout'
import { ReviewPay } from './Checkout/CheckoutFormStep1/CheckoutForm/CheckoutForm'
import { useMediaQuery } from 'react-responsive'

interface Props {
	orderData?: any
}
// a centralized container component for checkout
export const CheckoutContainer: React.FC<Props> = ({ orderData }) => {
	const {
		cart,
		summary,
		checkCartItemsHaveDeliverableDate,
		orderPayload,
		discount,
		checkoutFormStep1Temp,
		clearCart,
	} = useContext(ApplicationContext)
	const [currentStep, setCurrentStep] = useState<
		'detail' | 'review' | 'order'
	>(
		orderData &&
			(orderData.status === 'PENDING' ||
				orderData.status === 'PENDING_PAYMENT')
			? 'review'
			: orderData && orderData.status !== 'PENDING'
			? 'order'
			: orderData && orderData.status === 'CONFIRM'
			? 'order'
			: 'detail'
	)
	// calc total in frontend, when order not created
	const [feTotal, setFeTotal] = useState(0)

	const checkoutFormRef = useRef<any>()

	const { user } = useUser({})
	const router = useRouter()
	const isDesktop = useMediaQuery({
		query: '(min-width: 992px)',
	})

	useEffect(() => {
		if (orderData && orderData.status === 'CONFIRM') {
			setCurrentStep('order')
			clearCart()
		}
	}, [orderData])

	useEffect(() => {
		const total = priceHelper(
			summary.productsAmount + getCheckoutDeliveryFee() - (discount || 0)
		)

		setFeTotal(parseFloat(total))
	}, [summary, discount])

	// useEffect(() => {
	// 	window.onbeforeunload = () => 'Unsaved changes, Are you sure!'
	// }, [])

	// NOTE: if falsy go back to cart
	useEffect(() => {
		if (
			!orderData?._id &&
			(cart?.length < 1 || !checkCartItemsHaveDeliverableDate)
		) {
			router.push('/shopping-cart')
		}
	}, [checkCartItemsHaveDeliverableDate])

	useEffect(() => {
		if (
			!isNaN(summary.productsAmount) &&
			!isNaN(summary.minAmountCart) &&
			summary.productsAmount > 0 &&
			summary.productsAmount < summary.minAmountCart
		) {
			router.push('/shopping-cart')
		}
	}, [summary, feTotal])

	async function handleGoToReview(payload) {
		if (!isNaN(feTotal) && feTotal <= 0) {
			const { data } = await order(payload)

			clearCart()
			router.push(`/checkout/${data._id}?success=true`)
		}

		setCurrentStep('review')
		scrollToTop()
	}

	/**
	 * calc delivery fee from Summary
	 *
	 * if there is min spending for free delivery,
	 * we will calc
	 */
	function getCheckoutDeliveryFee() {
		let deliveryFee = summary.deliveryFee || 0

		if (summary.freeDelivery === true) {
			deliveryFee = 0
		} else if (summary.deliveryDiscount > 0) {
			deliveryFee = deliveryFee - summary.deliveryDiscount
		}

		return deliveryFee > 0 ? deliveryFee : 0
	}

	return (
		<main>
			{(orderData?._id || cart.length > 0) && (
				<StyledPageContainer>
					{(router.route === '/checkout/[id]' ||
						router.route === '/checkout') &&
						router.query.me !== 'yes' && (
							<OrderSteps
								activeTab={currentStep}
								tabChange={setCurrentStep}
								orderData={orderData}
								orderPayload={orderPayload}
							/>
						)}

					{/* ensure order detail case was covered or cart has some items. */}
					<>
						{/* conditional rendering according to the order steps */}
						<StyledCheckoutContainer>
							{
								{
									['detail']: (
										<>
											<div>
												<CheckoutFormStep1
													formRef={checkoutFormRef}
													cart={cart}
													orderData={orderData}
													goToReview={
														handleGoToReview
													}
												/>
											</div>
											<div>
												<CheckoutSummary
													products={
														orderData?.products ||
														cart.filter(
															(item) =>
																item.type ===
																undefined
														)
													}
													boxes={cart.filter(
														(item) =>
															item.type ===
															'slice-box'
													)}
													bundles={cart.filter(
														(item) =>
															item.type ===
															'bundle'
													)}
													peakDaySurcharge={
														checkoutFormStep1Temp
															?.orderDate
															?.isPeakDay &&
														getCheckoutDeliveryFee() >
															0
															? summary.peakDaySurcharge
															: 0
													}
													deliveryFee={getCheckoutDeliveryFee()}
													productsTotal={
														summary.productsAmount
													}
													discount={
														discount ||
														orderData?.virtualDiscount
													}
												/>

												<br />

												{!isDesktop && (
													<ReviewPay
														className="button"
														type="button"
														disabled={
															!checkCartItemsHaveDeliverableDate &&
															!orderData?._id
														}
														onClick={() =>
															checkoutFormRef.current?.handleSubmit()
														}
													>
														{orderData?._id
															? 'Edit'
															: 'Review & Pay'}
													</ReviewPay>
												)}
											</div>
										</>
									),
									['review']: (
										<>
											<div>
												<Payment
													orderData={orderData}
													feTotal={feTotal}
												/>
											</div>
											<div>
												{/* there is no attributes for total costs of the products, so frontend will */}
												{orderData ? (
													<CheckoutSummary
														// NOTE: if the order is created already, it cannot be editable
														peakDaySurcharge={
															orderData?.peakDaySurcharge ||
															0
														}
														deliveryFee={
															orderData?.delivery
																?.price
														}
														productsTotal={
															orderData?.products?.reduce(
																(prev, item) =>
																	item.quantity *
																		item.price +
																	prev,
																0
															) +
															(orderData.sliceBoxes?.reduce(
																(acc, curr) =>
																	acc +
																	curr.total,
																0
															) || 0) +
															(orderData.bundles?.reduce(
																(acc, curr) =>
																	acc +
																	curr.price *
																		curr.quantity,
																0
															) || 0)
														}
														boxes={
															orderData.sliceBoxes ||
															[]
														}
														bundles={
															orderData.bundles ||
															[]
														}
														discount={
															discount ||
															orderData?.virtualDiscount
														}
														products={
															orderData?.products ||
															cart
														}
														paid={orderData?.paid}
													/>
												) : (
													<CheckoutSummary
														products={
															orderData?.products ||
															cart.filter(
																(item) =>
																	item.type ===
																	undefined
															)
														}
														boxes={cart.filter(
															(item) =>
																item.type ===
																'slice-box'
														)}
														bundles={cart.filter(
															(item) =>
																item.type ===
																'bundle'
														)}
														peakDaySurcharge={
															checkoutFormStep1Temp
																?.orderDate
																?.isPeakDay &&
															getCheckoutDeliveryFee() >
																0
																? summary.peakDaySurcharge
																: 0
														}
														deliveryFee={getCheckoutDeliveryFee()}
														productsTotal={
															summary.productsAmount
														}
														discount={
															discount ||
															orderData?.virtualDiscount
														}
													/>
												)}

												{/* summary=
												{{
													productsAmount: orderData?.products?.reduce(
														(prev, item) =>
															item.quantity *
																item.price +
															prev,
														0
													),
													deliveryFee:
														orderData?.delivery
															?.price,
												}} */}
												<StyledSummaryContainer>
													<DeliveryInfo
														orderData={
															orderData
																? orderData
																: orderPayload
														}
													/>
												</StyledSummaryContainer>
											</div>
										</>
									),
									['order']: (
										<>
											<div>
												<OrderSummary
													orderData={orderData}
													mode="checkout"
												/>
											</div>
											{!user?.isLoggedIn && (
												<div>
													<RequestForRegister
														orderData={orderData}
													/>
												</div>
											)}
										</>
									),
								}[currentStep]
							}
						</StyledCheckoutContainer>
					</>
				</StyledPageContainer>
			)}
		</main>
	)
}
