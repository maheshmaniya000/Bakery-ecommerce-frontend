import { useContext } from 'react'
import { useRouter } from 'next/router'

import { StyledCartSummary } from './CartSummary.style'
import { StyledButton } from '@/styles/elements'
import { priceHelper } from '../../../utils/helper'
import { ApplicationContext } from 'context/ApplicationContext'

import PromoCode from '@/components/PromoCode/PromoCode'

const CartSummary: React.FC = () => {
	const router = useRouter()

	const { summary, discount, toggleValidDeliveryDate } =
		useContext(ApplicationContext)

	function handleCheckout() {
		toggleValidDeliveryDate(true)

		router.push('/checkout')
	}

	function isCheckoutBtnDisabled() {
		if (summary.productsAmount < summary.minAmountCart) {
			return true
		}
	}

	return (
		<StyledCartSummary>
			<h3>Summary</h3>

			<div
				className={`price-wrapper ${
					discount > 0 ? '' : 'border-bottom'
				}`}
			>
				<div>Products</div>
				<div>
					S$
					{priceHelper(summary.productsAmount)}
				</div>
			</div>

			{discount > 0 && (
				<div className="price-wrapper border-bottom">
					<div>Promo</div>
					<div>
						-S$
						{priceHelper(discount)}
					</div>
				</div>
			)}

			<div className="price-wrapper ">
				<div>Total</div>
				<div>
					S$
					{priceHelper(summary.productsAmount - discount, false)}
				</div>
			</div>

			<h4 className="promo-code-name">Promo code</h4>
			<PromoCode />

			<StyledButton
				className="button"
				onClick={() => handleCheckout()}
				disabled={isCheckoutBtnDisabled()}
			>
				Checkout
			</StyledButton>
		</StyledCartSummary>
	)
}

export default CartSummary
