import useSWR from 'swr'
import { Product } from 'interfaces/Product'

import { fetcher } from 'utils/fetcher'

export const useProductDetail = (id?: string | string[]) => {
	const { data, error } = useSWR<Product>(
		id ? process.env.API_URL + '/products/' + id + '/slug' : null,
		fetcher
	)

	return { data, error, loading: !data && !error }
}
