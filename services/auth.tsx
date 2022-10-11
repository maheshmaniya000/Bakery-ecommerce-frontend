import axios from 'axios'

const API_URL = process.env.API_URL

export const googleLogin = (payload: any) =>
	axios.post('/api/google_login', payload).then((res) => res.data)

export const login = (payload: any) =>
	axios.post('/api/login', payload).then((res) => res.data)

export const updateProfile = (payload, token) =>
	axios.put(API_URL + '/auth/me', payload, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const sendResetPassword = (payload) =>
	axios.post(API_URL + '/auth/send-reset-password', payload)

export const setPassword = (payload, token) =>
	axios.put(API_URL + '/auth/me/set_password', payload, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const changePassword = (payload, token) =>
	axios.put(API_URL + '/auth/me/change_password', payload, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const resetPassword = (payload) =>
	axios.post(API_URL + '/auth/reset-password', payload)

export const deleteAccount = (id, token) =>
	axios.delete(API_URL + '/auth/me/' + id + '/accounts', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const linkGoogle = (payload, token) =>
	axios.post(API_URL + '/auth/me/link_google', payload, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const linkFacebook = (payload, token) =>
	axios.post(API_URL + '/auth/me/link_facebook', payload, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})

export const registerUser = (payload: any) =>
	axios.post(API_URL + '/customers/register', payload)

export const facebookLogin = (payload: any) =>
	axios.post('/api/facebook_login', payload).then((res) => res.data)

export const sendOtp = (email: string) =>
	axios.post(API_URL + '/auth/send_otp', { email })

export const checkOtp = (email: string, otp: string) =>
	axios.post(API_URL + '/auth/check_otp', { email, otp })

export const logout = () => axios.post('/api/logout').then((res) => res.data)
