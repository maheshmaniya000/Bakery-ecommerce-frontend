const CDN_URL = 'https://d2ak17vknx4wce.cloudfront.net'

export const getCDNImage = (src = '') => {
	const [_, path] = src.split('images')

	return CDN_URL + path
}
