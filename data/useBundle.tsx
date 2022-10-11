import axios from 'axios'
import { Bundle } from 'interfaces/Bundle'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<Bundle> = (slug) => {
	return axios
		.get<Bundle>(`${process.env.API_URL}/bundles/slug/${slug}`)
		.then((response) => response.data)
}

export const useBundle = (slug = '') => {
	const { data, error } = useSWR(slug ? 'bundle' : null, () => fetcher(slug))

	return { data, error, loading: !data && !error }
}
