import useSWR from 'swr'
import { stringify } from 'qs'

import { fetcher } from 'utils/fetcher'

interface ProductPaginationParams {
	page?: number
	limit?: number
	category?: string | string[]
	status?: boolean | string
	sort?: string
	search?: string
}

export const useProductsWithPagination = ({
	page = 1,
	limit = 4,
	category,
	status,
	sort,
	search,
}: ProductPaginationParams) => {
	const query = {
		page,
		limit,
		category,
		status,
		sort,
		search,
	}

	if (!category) delete query.category

	if (!sort) delete query.sort

	if (!search) delete query.search

	const queryPath = stringify(query, { addQueryPrefix: true })

	const { data, error } = useSWR(
		process.env.API_URL + '/products' + queryPath,
		fetcher
	)

	if (data) {
		const list = data.docs.map((product) => {
			const variantStocks = product.variants.reduce(
				(acc, cur) => cur.stocks.length + acc,
				0
			)
			const stock = product.stocks.length + variantStocks
			return {
				...product,
				stock,
			}
		})

		const inStock = list.filter((product) => !!product.stock)
		const soldOut = list.filter((product) => !product.stock)

		return {
			data: { ...data, docs: [...inStock, ...soldOut] },
			error,
			loading: false,
		}
	}

	return { data, error, loading: !data && !error }
}
