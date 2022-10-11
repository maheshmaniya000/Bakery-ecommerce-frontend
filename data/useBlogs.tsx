import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useBlogs = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/articles?status=PUBLISH&limit=50',
		fetcher
	)

	return { data, error, loading: !data && !error }
}
