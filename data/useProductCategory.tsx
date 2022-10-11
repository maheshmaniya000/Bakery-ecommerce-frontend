import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useProductCategory = () => {
	const { data, error } = useSWR(process.env.API_URL + '/categories', fetcher)

	return { data, error, loading: !data && !error }
}
