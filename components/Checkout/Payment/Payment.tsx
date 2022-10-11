import { StyledPageHeading } from '@/styles/elements/typography'
import Stripe from './Stripe/Stripe'
import {
	FormsContainer,
	StyledPayment,
	StyledPaymentMethod,
	Title,
	Count,
	TextAreaContainer,
} from './Payment.style'
import { StyledPureTextArea } from '@/styles/elements/form'
import { useEffect, useState, ChangeEvent } from 'react'
import HitPay from '@/components/Checkout/Payment/HitPay/HitPay'

interface Props {
	orderData: any
	feTotal: number
}

export const Payment: React.FC<Props> = ({ orderData, feTotal }) => {
	const [paymentMethod, setPaymentMethod] = useState('HITPAY')
	const [giftMessage, setGiftMessage] = useState('')
	const [note, setNote] = useState('')

	useEffect(() => {
		if (
			orderData &&
			orderData.status === 'PENDING_PAYMENT' &&
			orderData.paymentType
		) {
			setPaymentMethod(orderData.paymentType)
			setGiftMessage(orderData.giftMessage)
			setNote(orderData.note)
		}
	}, [orderData])

	function renderMethods() {
		if (
			orderData &&
			orderData.status === 'PENDING_PAYMENT' &&
			!!orderData.paymentType
		) {
			return null
		}

		return [
			{
				value: 'HITPAY',
				label: 'PAYNOW by Hitpay',
			},
			{
				value: 'STRIPE',
				label: 'Credit card',
			},
		].map((item) => (
			<div
				className={
					'item ' + (paymentMethod === item.value ? 'selected' : '')
				}
				key={item.value}
				onClick={() => {
					setPaymentMethod(item.value)
				}}
			>
				<img src="/images/icons/card.svg" /> {item.label}
			</div>
		))
	}

	function handleGiftMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value

		if (value.length <= 200) {
			setGiftMessage(value)
		}
	}

	function handleNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value

		if (value.length <= 200) {
			setNote(value)
		}
	}

	return (
		<StyledPayment>
			{orderData && orderData.status === 'PENDING_PAYMENT' ? null : (
				<>
					<FormsContainer>
						<Title>
							Leave a personal message for your recipient here!
						</Title>
						<TextAreaContainer>
							<StyledPureTextArea
								name="message"
								value={giftMessage}
								placeholder="Write something"
								onChange={handleGiftMessageChange}
							/>
							<Count>{giftMessage.length}/200</Count>
						</TextAreaContainer>
					</FormsContainer>

					<FormsContainer>
						<Title>Provide any instructions for our team.</Title>
						<TextAreaContainer>
							<StyledPureTextArea
								name="note"
								value={note}
								placeholder="Write something"
								onChange={handleNoteChange}
							/>
							<Count>{note.length}/200</Count>
						</TextAreaContainer>
					</FormsContainer>
				</>
			)}

			<StyledPageHeading size="1.6rem">Payment Method</StyledPageHeading>
			<StyledPaymentMethod>{renderMethods()}</StyledPaymentMethod>

			{paymentMethod === 'STRIPE' ? (
				<>
					<div className="payment-accepted">
						Payment accepted <img src="/images/icons/amex.svg" />{' '}
						<img src="/images/icons/visa.svg" />{' '}
						<img src="/images/icons/mastercard.svg" />
					</div>
					<div className="form-wrapper">
						<Stripe
							orderData={{ ...orderData, giftMessage, note }}
							feTotal={feTotal}
						/>
					</div>
				</>
			) : (
				<HitPay
					orderData={{ ...orderData, giftMessage, note }}
					feTotal={feTotal}
				/>
			)}
		</StyledPayment>
	)
}
