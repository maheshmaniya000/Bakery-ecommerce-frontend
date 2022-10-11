import useSWR from 'swr'
import { fetcher } from 'utils/fetcher'

export const useMyOrder = (token) => {
	const { data, error } = useSWR(
		token ? [process.env.API_URL + '/auth/me/orders', token] : null,
		fetcher
	)

	return { data, error, loading: !data && !error }
}
