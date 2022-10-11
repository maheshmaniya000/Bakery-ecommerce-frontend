import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useCategoryDetail = (id?: string | string[]) => {
	const { data, error } = useSWR(
		id ? process.env.API_URL + '/categories/' + id + '/slug' : null,
		fetcher
	)

	return { data, error, loading: !data && !error }
}
