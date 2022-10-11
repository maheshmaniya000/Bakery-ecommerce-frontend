import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useOrders = () => {
	const { data, error } = useSWR(process.env.API_URL + '/orders', fetcher)

	return { data, error, loading: !data && !error }
}
