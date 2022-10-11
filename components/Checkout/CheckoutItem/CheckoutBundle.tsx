import { Bundle } from 'interfaces/Bundle'
import { getCDNImage } from 'lib/getCDNImage'
import { priceHelper } from 'utils/helper'
import { StyledCheckoutItem } from './CheckoutItem.styel'

type Props = {
	item: {
		id: string
		bundle: Bundle
		quantity: number
	}
}

export default function CheckoutBundle({ item }: Props) {
	return (
		<StyledCheckoutItem>
			<div>
				<img
					src={getCDNImage(item.bundle.image)}
					alt={item.bundle.name}
					className="thumbnail"
				/>
			</div>

			<div className="product-info">
				<h4 className="product-name">{item.bundle.name}</h4>
				<div>Qty {item.quantity}</div>
			</div>

			<div className="price">
				S$
				{priceHelper(item.quantity * item.bundle.price)}
			</div>
		</StyledCheckoutItem>
	)
}
