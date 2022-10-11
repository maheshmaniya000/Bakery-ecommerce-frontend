import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const uesPostal = (postal?: string | string[]) => {
	const { data, error } = useSWR(
		postal
			? `https://developers.onemap.sg/commonapi/search?searchVal=${postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
			: null,
		fetcher
	)

	return { data, error, loading: !data && !error }
}
