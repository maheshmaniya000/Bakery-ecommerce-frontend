import useSWR from 'swr'
import { stringify } from 'qs'

import { fetcher } from 'utils/fetcher'

export const useDeliveryMethods = () => {
    const query = {
        status: true
    };

	const { data, error } = useSWR(
		`${process.env.API_URL}/delivery_methods${stringify(query, { addQueryPrefix: true })}`,
		fetcher
	)

	return { data, error, loading: !data && !error }
}