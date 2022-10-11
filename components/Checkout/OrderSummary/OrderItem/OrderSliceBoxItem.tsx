import { SliceBox } from 'interfaces/SliceBox'
import { getCDNImage } from 'lib/getCDNImage'
import { priceHelper } from 'utils/helper'
import { StyledOrderItem } from './OrderItem.style'

type Props = {
	box: SliceBox
}

export default function OrderSliceBoxItem({ box }: Props) {
	return (
		<StyledOrderItem>
			<div>
				<img
					src={getCDNImage(box.option.image)}
					alt={box.option.name}
					className="thumbnail"
				/>
			</div>

			<div className="product-info">
				<h4 className="product-name">{box.option.name}</h4>

				<ul className="special-product-info">
					{box.products.map((item, index) => (
						<li key={index}>
							{item.qty}&nbsp;{item.product.name}
						</li>
					))}
				</ul>
			</div>

			<div className="quantity-input">Quantity {box.quantity}</div>

			<div className="price">
				S$
				{priceHelper(box.total)}
			</div>
		</StyledOrderItem>
	)
}
