import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useBlog = (slug: string) => {
	const { data, error } = useSWR(
		process.env.API_URL + '/articles/slug/' + slug,
		fetcher
	)

	return { data, error, loading: !data && !error }
}
