import { useContext, useState } from 'react'
import { StyledButton } from '@/styles/elements'
import { order, processHitPay } from '../../../../services/checkout'
import Link from 'next/link'
import numeral from 'numeral'

import { ButtonLoading } from '@/styles/elements/button-loading'
import { ApplicationContext } from 'context/ApplicationContext'

const HitPay = ({ orderData, feTotal = 0 }) => {
	const { orderPayload } = useContext(ApplicationContext)
	// NOTE: if the order data is not ready, mutate this data by creating order in near future
	let realOrderData = orderData
	const [agree, toggleAgree] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		// NOTE: get the order data by creating order
		if (!realOrderData._id) {
			try {
				realOrderData = (
					await order({
						...orderPayload,
						giftMessage: orderData.giftMessage,
						note: orderData.note,
					})
				).data
			} catch (error) {}
		}

		setIsLoading(true)

		// fetch stripe token first from api
		try {
			const response = await processHitPay(realOrderData._id)
			window.location.href = response.data.url
		} catch (e) {}
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
		<div>
			<form onSubmit={handleSubmit}>
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
					}}
				>
					{isLoading ? (
						<ButtonLoading />
					) : (
						<span>
							Pay Now&nbsp;
							<b>{numeral(getAmount()).format('$0,0.00')}</b>
						</span>
					)}
				</StyledButton>
			</form>
		</div>
	)
}

export default HitPay
