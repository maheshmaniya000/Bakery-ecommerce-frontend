import { Product } from 'interfaces/Product'
import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export default function useProductsByCategory({ slug = '', sort = '' }) {
	const { data, error } = useSWR<Product[]>(
		slug
			? process.env.API_URL +
					`/categories/${slug}/slug/products?sort=${sort}`
			: null,
		fetcher
	)

	return { data: data || [], error, loading: !data && !error }
}
