import axios from 'axios'

const API_URL = process.env.API_URL

export const checkStockDates = (payload: any) =>
	axios.post(API_URL + '/stocks/dates', payload)

interface Payload {
	customerId?: string
	orderDate: string
	products: any[]
	delivery: any
	recipient: any
	sender: any
	giftMessage?: string
}

export const order = (payload: Payload) =>
	axios.post(API_URL + '/orders', payload)

export const editOrder = (id: string, payload: any) => {
	return axios.put(API_URL + `/orders/${id}`, payload)
}

export const getStripeToken = (orderId) =>
	axios.get(API_URL + `/orders/${orderId}/stripe`)

export const processHitPay = (orderId) =>
	axios.get(API_URL + `/orders/${orderId}/hitpay`)

export const updateGiftTag = (id: string, payload: any) =>
	axios.put(`${API_URL}/orders/${id}/gift_tag`, payload)

export const updateInstruction = (id: string, payload: any) =>
	axios.put(`${API_URL}/orders/${id}/instruction`, payload)

export const updateSpecialInfo = (id: string, payload: any) =>
	axios.put(`${API_URL}/orders/${id}/special_info`, payload)

export const checkPromoCode = (code, total, token) =>
	axios.post(
		`${API_URL}/promo_codes/check`,
		{ code, total },
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
	)
