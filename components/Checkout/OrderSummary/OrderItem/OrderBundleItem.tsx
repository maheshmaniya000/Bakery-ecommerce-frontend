import { OrderBundleProduct } from '@/components/Me/MyOrders/interface/order'
import { Bundle } from 'interfaces/Bundle'
import { getCDNImage } from 'lib/getCDNImage'
import { priceHelper } from 'utils/helper'
import { StyledOrderItem } from './OrderItem.style'

type Props = {
	bundle: Bundle
	quantity: number
	price: number
	products: OrderBundleProduct[]
}

export default function OrderBundleItem({
	bundle,
	quantity,
	price,
	products,
}: Props) {
	return (
		<StyledOrderItem>
			<div>
				<img
					src={getCDNImage(bundle.image)}
					alt={bundle.name}
					className="thumbnail"
				/>
			</div>

			<div className="product-info">
				<h4 className="product-name">{bundle.name}</h4>

				{products.map((product) => {
					const variant = product.product.variant
						? product.product.product.variants.find(
								(variant) =>
									variant._id === product.product.variant
						  )
						: ''

					return (
						<ul
							className="special-product-info"
							style={{
								paddingTop: '10px',
							}}
							key={product._id}
						>
							<li
								style={{
									fontWeight: 600,
								}}
							>
								{product.product.product.name}
								{variant ? ` (${variant.size})` : ''} x
								{product.product.qty}
							</li>

							{product.product.product.isSpecial && (
								<>
									<li
										style={{
											marginTop: '10px',
										}}
									>
										Candles (standard size):{' '}
										{product.candles}
									</li>
									<li>
										Cake Knife:{' '}
										{product.knife ? 'Yes' : 'No'}
									</li>
									{!product.product.product.isNoCakeText && (
										<li>Cake Text: {product.cakeText}</li>
									)}
								</>
							)}
						</ul>
					)
				})}
			</div>

			<div className="quantity-input">Quantity {quantity}</div>

			<div className="price">
				S$
				{priceHelper(price * quantity)}
			</div>
		</StyledOrderItem>
	)
}
