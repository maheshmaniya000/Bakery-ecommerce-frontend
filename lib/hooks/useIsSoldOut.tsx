import { Product } from 'interfaces/Product'

export const useIsSoldOut = (product: Product) => {
	const variantStocks = product.variants.reduce(
		(acc, cur) => cur.stocks.length + acc,
		0
	)
	const stocks = product.stocks.length + variantStocks

	return [!stocks ? true : false]
}
