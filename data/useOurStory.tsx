import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useOurStory = () => {
	const { data, error } = useSWR(
		process.env.API_URL + '/contents/our_story',
		fetcher
	)

	return { data, error, loading: !data && !error }
}
