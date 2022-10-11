import { Product } from 'interfaces/Product'
import { SliceBoxOption } from 'interfaces/SliceBox'
import { getCDNImage } from 'lib/getCDNImage'
import { priceHelper } from 'utils/helper'
import { StyledCheckoutItem } from './CheckoutItem.styel'

type Props = {
	item: {
		id: string
		option: SliceBoxOption
		quantity: number
		products: Array<{
			product: Product
			qty: number
		}>
	}
}

export default function CheckoutSliceBox({ item }: Props) {
	const subtotal = item.products.reduce(
		(acc, curr) => acc + curr.qty * curr.product.price,
		0
	)

	return (
		<StyledCheckoutItem>
			<div>
				<img
					src={getCDNImage(item.option.image)}
					alt={item.option.name}
					className="thumbnail"
				/>
			</div>

			<div className="product-info">
				<h4 className="product-name">{item.option.name}</h4>
				<div className="variant-size">
					{item.products.map((_item) => (
						<span
							key={_item.product._id}
							style={{
								display: 'block',
							}}
						>
							{_item.qty}&nbsp;{_item.product.name}
						</span>
					))}
				</div>
				<div>Qty {item.quantity}</div>
			</div>

			<div className="price">
				S$
				{priceHelper(item.quantity * subtotal)}
			</div>
		</StyledCheckoutItem>
	)
}
