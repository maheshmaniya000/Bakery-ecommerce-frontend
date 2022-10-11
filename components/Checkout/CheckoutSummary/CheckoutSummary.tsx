import { useRouter } from 'next/router'
import Link from 'next/link'

import { Anchor } from '@/styles/elements'
import { StyledCheckoutSummary } from './CheckoutSummary.style'
import { priceHelper } from '../../../utils/helper'
import { CheckoutItem } from '@/components/Checkout/CheckoutItem/CheckoutItem'
import CheckoutSliceBox from '../CheckoutItem/CheckoutSliceBox'
import CheckoutBundle from '../CheckoutItem/CheckoutBundle'

interface Props {
	products?: any[]
	boxes?: any[]
	bundles?: any[]
	discount?: number
	productsTotal?: number
	deliveryFee?: number
	peakDaySurcharge?: number
	paid?: number
}

const CheckoutSummary = ({
	products = [],
	boxes = [],
	bundles = [],
	productsTotal = 0,
	deliveryFee = 0,
	peakDaySurcharge = 0,
	discount = 0,
	paid = 0,
}: Props) => {
	const router = useRouter()

	return (
		<StyledCheckoutSummary>
			<h3>Summary</h3>

			{products.map((product) => (
				<CheckoutItem product={product} key={product._id} />
			))}

			{boxes.map((box) => (
				<CheckoutSliceBox item={box} key={box.id} />
			))}

			{bundles.map((bundle) => (
				<CheckoutBundle item={bundle} key={bundle.id} />
			))}

			<div className="price-wrapper">
				<div>Products</div>
				<div>
					S$
					{priceHelper(productsTotal)}
				</div>
			</div>

			<div className="price-wrapper">
				<div>Delivery fee</div>
				<div>
					S$
					{priceHelper(deliveryFee)}
				</div>
			</div>

			<div className="price-wrapper border-top">
				<div>Subtotal</div>
				<div>
					S$
					{priceHelper(productsTotal + deliveryFee)}
				</div>
			</div>

			{discount > 0 && (
				<div className="price-wrapper">
					<div>Promo</div>
					<div>
						-S$
						{priceHelper(discount)}
					</div>
				</div>
			)}

			{peakDaySurcharge > 0 && (
				<div className="price-wrapper">
					<div>Peak day surcharge</div>
					<div>
						S$
						{priceHelper(peakDaySurcharge)}
					</div>
				</div>
			)}

			{paid > 0 && (
				<div className="price-wrapper">
					<div>Paid</div>
					<div>
						S$
						{priceHelper(paid)}
					</div>
				</div>
			)}

			<div className="price-wrapper">
				<div>Total</div>
				<div>
					S$
					{priceHelper(
						productsTotal +
							deliveryFee +
							peakDaySurcharge -
							discount -
							paid,
						false
					)}
				</div>
			</div>

			{router.pathname !== '/me/checkout/[id]' && (
				<div className="cart-link">
					<Link href="/shopping-cart">
						<Anchor isUnderline={true}>
							Back to Shopping Cart
						</Anchor>
					</Link>
				</div>
			)}
		</StyledCheckoutSummary>
	)
}

export default CheckoutSummary
