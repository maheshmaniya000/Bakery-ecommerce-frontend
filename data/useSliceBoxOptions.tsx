import { SliceBoxOption } from 'interfaces/SliceBox'
import useSWR from 'swr'

import { fetcher } from 'utils/fetcher'

export const useSliceBoxOptions = () => {
	const { data, error } = useSWR<SliceBoxOption[]>(
		process.env.API_URL + '/slice_box_options?active=true',
		fetcher
	)

	return { data, error, loading: !data && !error }
}
