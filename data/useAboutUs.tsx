import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useAboutUs = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/contents/about_us',
		fetcher
	)

	return { data: data ? data.data : '', error, loading: !data && !error }
}
