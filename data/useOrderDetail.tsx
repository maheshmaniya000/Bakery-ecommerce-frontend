import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useOrderDetail = (id?: string | string[]) => {
	const { data, error, mutate } = useSWR(
		id ? process.env.API_URL + '/orders/' + id : null,
		fetcher
	)

	return { data, error, mutate, loading: !data && !error }
}
