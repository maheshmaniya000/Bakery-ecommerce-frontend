import axios from 'axios'

const API_URL = process.env.API_URL

export const create = (payload: any) =>
	axios.post(API_URL + '/contact-us', payload)
