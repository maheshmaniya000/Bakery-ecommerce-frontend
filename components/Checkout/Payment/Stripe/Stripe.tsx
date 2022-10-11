import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js'
import numeral from 'numeral'
import { mutate } from 'swr'

import { loadStripe } from '@stripe/stripe-js'
import { StyledButton } from '@/styles/elements'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../../../context/ApplicationContext'
import {
	getStripeToken,
	order as createOrder,
} from '../../../../services/checkout'
import { StyledStripe } from './Stripe.style'
import { extractErrorMessage, scrollToTop } from 'utils/helper'
import { useRouter } from 'next/router'
import ErrorHandler from '../../../../components/ErrorHandler/ErrorHandler'
import styled from '@emotion/styled'
import Link from 'next/link'

import useInterval from 'utils/hooks/useInterval'
import { useOrderDetail } from 'data/useOrderDetail'
import { fetcher } from 'utils/fetcher'

const ErrorWrapper = styled.div`
	margin-top: 12px;
`

function StripeForm({ orderData, feTotal = 0 }) {
	const [orderId, setOrderId] = useState(orderData?._id || '')
	const [intentId, setIntentId] = useState('')

	const { data: order } = useOrderDetail(orderId)

	// let usingOrderData = orderData
	const [agree, toggleAgree] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { orderPayload, clearCart } = useContext(ApplicationContext)
	const stripe = useStripe()
	const elements = useElements()
	const router = useRouter()

	const [startInterval, setStartInterval] = useState(false)

	useInterval(
		async () => {
			const data = await fetcher(
				process.env.API_URL + '/orders/intents/' + intentId
			)

			if (data.status === 'requires_payment_method') {
				setError('Payment fail, please try again.')
				setIsLoading(false)
				setStartInterval(false)
			} else if (data.status === 'succeeded') {
				mutate(process.env.API_URL + '/orders/' + order?._id || orderId)
			}
		},
		startInterval ? 2000 : null
	)

	useEffect(() => {
		if (order && order.status === 'CONFIRM') {
			clearCart()
			scrollToTop()
			router.push(
				`/checkout/${order._id}${
					orderData ? '?success=true&me=yes' : '?success=true'
				}`
			)
		}
	}, [order])

	const handleSubmit = async (event) => {
		// let processOrder = order

		// Block native form submission.
		event.preventDefault()
		setIsLoading(true)
		setError(null)

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return
		}

		const cardElement = elements.getElement(CardElement)

		// fetch stripe token first from api
		if (order?._id) {
			try {
				const secret: any = await getStripeToken(order._id)

				if (secret) {
					setIntentId(secret.data.id)

					const { error, paymentIntent } =
						await stripe.confirmCardPayment(
							secret.data.client_secret,
							{
								payment_method: {
									card: cardElement,
									billing_details: {
										name:
											order.sender.firstName +
											' ' +
											order.sender.lastName,
									},
								},
							}
						)

					if (!error && paymentIntent.status === 'succeeded') {
						setTimeout(() => {
							setStartInterval(true)
						}, 1500)
					}
				}
			} catch (error) {
				setError(error)
				setIsLoading(false)
			}
		} else {
			try {
				const { data } = await createOrder({
					...orderPayload,
					giftMessage: orderData.giftMessage,
					note: orderData.note,
				})

				const secret: any = await getStripeToken(data._id)

				if (secret) {
					setIntentId(secret.data.id)

					const { error, paymentIntent } =
						await stripe.confirmCardPayment(
							secret.data.client_secret,
							{
								payment_method: {
									card: cardElement,
									billing_details: {
										name:
											data.sender.firstName +
											' ' +
											data.sender.lastName,
									},
								},
							}
						)

					if (error) {
						setError(error.message)
						setIsLoading(false)
					}

					if (!error && paymentIntent.status === 'succeeded') {
						setOrderId(data._id)

						setTimeout(() => {
							setStartInterval(true)
						}, 1500)
					}
				}
			} catch (error) {
				setError(error)
				setIsLoading(false)
			}
		}
	}

	function getAmount() {
		if (orderData?.unpaid) {
			return (
				orderData?.totalAmount -
				(orderData?.virtualDiscount || 0) -
				orderData?.paid
			)
		}

		return feTotal
	}

	return (
		<>
			<StyledStripe>
				<form onSubmit={handleSubmit}>
					<CardElement
						options={{
							// can hide the postal code
							hidePostalCode: true,
							style: {
								base: {
									fontSize: '16px',
									color: '#424770',
									'::placeholder': {
										color: '#aab7c4',
									},
									fontFamily: 'Marion Regular,sans-serif',
									padding: '15px 20px',
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>
					{error && (
						<ErrorWrapper>
							<ErrorHandler
								message={extractErrorMessage(error)}
							/>
						</ErrorWrapper>
					)}

					<label className="terms">
						<input
							type="checkbox"
							onClick={() => toggleAgree(!agree)}
						/>
						<div>
							I have read and consent to the{' '}
							<Link href="/terms-and-conditions">
								<a>Terms and conditions</a>
							</Link>{' '}
							and the{' '}
							<Link href="/refund-policy">
								<a>refund policy</a>
							</Link>
						</div>
					</label>
					<StyledButton
						type="submit"
						disabled={!agree || isLoading}
						style={{
							fontSize: '1.6rem',
							lineHeight: '1.5',
							padding: '14px 28px',
						}}
					>
						{isLoading ? (
							<Loading>
								Payment processing, please do not refresh
								<div className="loader">
									<DotFlashing />
								</div>
							</Loading>
						) : (
							<>
								Pay Now&nbsp;
								<b>{numeral(getAmount()).format('$0,0.00')}</b>
							</>
						)}
					</StyledButton>
				</form>
			</StyledStripe>
		</>
	)
}

const Loading = styled.div`
	position: relative;

	.loader {
		display: block;
		position: relative;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`

const DotFlashing = styled.div`
	position: relative;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: #7e5000;
	color: #7e5000;
	animation: dotFlashing 1s infinite linear alternate;
	animation-delay: 0.5s;

	::before,
	::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}

	::before {
		left: -15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #7e5000;
		color: #7e5000;
		animation: dotFlashing 1s infinite alternate;
		animation-delay: 0s;
	}

	::after {
		left: 15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #7e5000;
		color: #7e5000;
		animation: dotFlashing 1s infinite alternate;
		animation-delay: 1s;
	}

	@keyframes dotFlashing {
		0% {
			background-color: #7e5000;
		}
		50%,
		100% {
			background-color: #e7d8c380;
		}
	}
`

const stripePromise = loadStripe(process.env.STRIPE_SECRET)

const Stripe = ({ orderData, feTotal }) => {
	return (
		<Elements stripe={stripePromise}>
			<StripeForm orderData={orderData} feTotal={feTotal} />
		</Elements>
	)
}

export default Stripe
