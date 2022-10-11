import axios from 'axios'

const API_URL = process.env.API_URL

export const getHomeCarousel = () =>
	axios.get(`${API_URL}/contents/home_carousel`)

export const getFeaturedOn = () => axios.get(`${API_URL}/contents/featured_on`)

export const getOurClients = () => axios.get(`${API_URL}/contents/our_clients`)

export const getRefundPolicy = () =>
	axios.get(`${API_URL}/contents/refund_policy`)

export const getPrivacyPolicy = () =>
	axios.get(`${API_URL}/contents/privacy_policy`)

export const getTnc = () => axios.get(`${API_URL}/contents/tnc`)

export const getFaq = () => axios.get(`${API_URL}/contents/faq`)

export const getFaqCakecare = () =>
	axios.get(`${API_URL}/contents/faq_cakecare`)

export const getAnnouncements = () => axios.get(`${API_URL}/announcements`)

export const newsletterSubscription = (email) =>
	axios
		.post(`${API_URL}/subscribers/subscribe`, { email })
		.then((res) => res.data)
