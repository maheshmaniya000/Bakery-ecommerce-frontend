import { StyledCheckoutItem } from '@/components/Checkout/CheckoutItem/CheckoutItem.styel'
import { priceHelper } from '../../../utils/helper'

interface Props {
	product: any
}

export const CheckoutItem: React.FC<Props> = ({ product }) => {
	return (
		<StyledCheckoutItem>
			<div>
				<img
					src={product?.product?.mainImage || '/images/logo.svg'}
					alt={product?.product?.name || product.itemName}
					className="thumbnail"
				/>
			</div>
			<div className="product-info">
				<h4 className="product-name">
					{product?.product?.name || product.itemName}
				</h4>
				<div className="variant-size">
					{product.variantProduct && (
						<span>{product.variantProduct.size}</span>
					)}
				</div>
				<div>Qty {product?.quantity}</div>
			</div>

			{product.variantProduct || product.variant ? (
				<div className="price">
					S$
					{priceHelper(
						(product.variantProduct?.price ||
							product.variant?.price) * product.quantity
					)}
				</div>
			) : (
				<div className="price">
					S$
					{priceHelper(
						(product.product?.basePrice ||
							product.product?.price ||
							product.price) * product.quantity
					)}
				</div>
			)}
		</StyledCheckoutItem>
	)
}
