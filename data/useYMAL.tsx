import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export default function useYMAL({ productId = '' }) {
	const { data, error } = useSWR(
		productId ? process.env.API_URL + `/products/${productId}/ymal` : null,
		fetcher
	)

	return { data: data || [], error, loading: !data && !error }
}
