import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const usePopularItems = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/settings/popular_items',
		fetcher
	)

	return { data: data || [], error, loading: !data && !error }
}
