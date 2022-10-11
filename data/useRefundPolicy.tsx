import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useRefundPolicy = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/contents/refund_policy',
		fetcher
	)

	return { data: data ? data.data : '', error, loading: !data && !error }
}
