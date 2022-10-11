import { useState } from 'react'
import { mutate } from 'swr'

import { StyledOrderItem } from './OrderItem.style'
import { priceHelper } from '../../../../utils/helper'
// import { StyledEditImage } from '@/components/Cart/CartItem/CartItem.style'
import { AnimatePresence } from 'framer-motion'
import EditSpecialItem from '@/components/Cart/EditSpecialItem/EditSpecialItem'
import { updateSpecialInfo } from 'services/checkout'

interface Props {
	product: any
	order?: any
}

const OrderItem = ({ product, order }: Props) => {
	const [showEditModal, toggleEditModal] = useState(false)

	function handleOnEditSpecialSubmit(values) {
		updateSpecialInfo(order._id, {
			product: product.product._id,
			message: values.message,
			candles: values.candles,
			knife: values.knifes.length > 0,
		}).then(() => {
			mutate(process.env.API_URL + '/orders/' + order._id)
		})

		toggleEditModal(false)
	}

	return (
		<StyledOrderItem>
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

				{/* product variants */}
				{product.variant && (
					<div className="cart-variant-wrapper">
						{product.variant.size}
					</div>
				)}

				{/* special product properties */}
				{product?.product?.isSpecial && (
					<ul className="special-product-info">
						<li>Candles (standard size): {product.candles}</li>
						<li>Cake Knife: {product.knifes > 0 ? 'Yes' : 'No'}</li>
						<li>
							Cake Text: {product.message}{' '}
							{/* {order?.status === 'CONFIRM' && (
								<StyledEditImage
									src="/images/icons/edit-icon.svg"
									onClick={() => {
										toggleEditModal(true)
									}}
								/>
							)} */}
						</li>
					</ul>
				)}
			</div>

			<AnimatePresence>
				<EditSpecialItem
					toggleModal={toggleEditModal}
					showModal={showEditModal}
					productDetail={{
						message: product.message,
						candles: product.candles,
						knifes: product.knifes > 0 ? ['yes'] : [],
					}}
					onSubmit={handleOnEditSpecialSubmit}
				/>
			</AnimatePresence>

			<div className="quantity-input">
				{/* {product.quantity} x ${product?.price} */}
				Quantity {product.quantity}
			</div>

			{product.variant ? (
				<div className="price">
					S$
					{priceHelper(product.variant?.price * product.quantity)}
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
		</StyledOrderItem>
	)
}

export default OrderItem
