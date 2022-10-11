import useSWR from 'swr'
import axios from 'axios'

type Props = {
	cart: Array<{
		productId: string
		variantId?: string
		qty: number
	}>
	bundles?: Array<{
		bundle: string
		quantity: number
	}>
	key: string
}

type DeliveryDate = {
	date: string
	valid: boolean
	isPeakDay: boolean
}

export const useDeliverableDates = ({ cart, bundles = [], key }: Props) => {
	const total =
		cart.reduce((acc, curr) => acc + curr.qty, 0) +
		bundles.reduce((acc, curr) => acc + curr.quantity, 0)

	return useSWR<DeliveryDate[]>(
		total === 0 ? null : ['deliverable-dates', key, total],
		() => {
			return axios
				.post<DeliveryDate[]>(
					`${process.env.API_URL}/orders/get-deliverable-dates`,
					{
						cart: cart.filter((_cart) => _cart.qty > 0),
						bundles,
					}
				)
				.then((res) => res.data)
		},
		{
			fallbackData: [],
			revalidateOnMount: true,
		}
	)
}
