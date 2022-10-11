import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useCurrentlyTrending = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/settings/currently_trending',
		fetcher
	)

	return { data: data || [], error, loading: !data && !error }
}
