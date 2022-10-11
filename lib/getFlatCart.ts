import { concat } from 'lodash'

export const getFlatCart = (cart: any[]) => {
	const items = cart
		.filter((item) => item.type === undefined)
		.map((item) => ({
			productId: item.product_id,
			qty: item.quantity,
			variantId: item.variantProduct
				? item.variantProduct._id
				: undefined,
		}))

	const boxes = cart
		.filter((item) => item.type === 'slice-box')
		.map((item) =>
			item.products.map((_product) => ({
				..._product,
				qty: _product.qty * item.quantity,
			}))
		)
		.reduce((acc, curr) => [...acc, ...curr], [])
		.map((item) => ({
			productId: item.product._id,
			qty: item.qty,
		}))

	return concat(items, boxes)
}
