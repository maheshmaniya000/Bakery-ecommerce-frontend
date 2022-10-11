import axios from 'axios'
import { Bundle } from 'interfaces/Bundle'
import useSWR, { Fetcher } from 'swr'
import { stringify } from 'qs'

const fetcher: Fetcher<Bundle[]> = (sortBy = '') => {
	const query = {}

	switch (sortBy) {
		case 'basePrice':
			query['sort'] = 'price'
			break

		default:
			query['sort'] = sortBy
			break
	}

	return axios
		.get<Bundle[]>(
			`${process.env.API_URL}/bundles/availables${stringify(query, {
				addQueryPrefix: true,
			})}`
		)
		.then((response) => response.data)
}

export const useBundles = (sortBy) => {
	const { data, error } = useSWR(['bundles', sortBy], () => fetcher(sortBy), {
		fallbackData: [],
	})

	return { data, error, loading: !data && !error }
}
