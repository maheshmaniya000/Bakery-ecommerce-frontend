import { PromoCode } from 'interfaces/Promo'
import { useMediaQuery } from 'react-responsive'

export const extractErrorMessage = (error) => {
	try {
		if (error.response) {
			if (error.response.data && error.response.data.message) {
				if (Array.isArray(error.response.data.message)) {
					return error.response.data.message.join(', ')
				} else {
					return error.response.data.message
				}
			} else {
				return JSON.stringify(error.response.data)
			}
		} else {
			return typeof error === 'string' ? error : 'error'
		}
	} catch (e) {
		return 'Something went wrong'
	}
}

export function priceHelper(price: number, negative = true) {
	if (!negative && price <= 0) {
		return Number(0).toFixed(2)
	}

	return Number(price).toFixed(2)
}

export const getPromoAmount = (promoCode: PromoCode, productAmount: number) => {
	if (!promoCode) return 0
	else if (promoCode.type === 'ABSOLUTE') {
		return promoCode.amount
	} else if (promoCode.type === 'PERCENTAGE') {
		return (productAmount * promoCode.amount) / 100
	}
}

/**
 * animate scroll to top in main window
 */
let scrollToTopTimer
export const scrollToTop = () => {
	if (scrollToTopTimer) clearTimeout(scrollToTopTimer)
	scrollToTopTimer = setTimeout(() => {
		let top = window.pageYOffset || document.documentElement.scrollTop
		top += -top * 0.3
		if (top < 5 || isNaN(top)) {
			clearTimeout(scrollToTopTimer)
			scrollToTopTimer = null
			top = 0
			window.scrollTo(0, 0)
			return
		}
		window.scrollTo(0, top)
		scrollToTop()
	}, 1000 / 60)
}

export const useIsMobile = () =>
	useMediaQuery({
		query: '(max-width: 768px)',
	})
