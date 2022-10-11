export interface PromoCode {
	active: boolean
	isIncludeDeliveryFee: boolean
	isOneTimePerUser: boolean
	isUnlimited: boolean
	used: number
	total: number
	amount: number
	_id: string
	code: string
	type: 'ABSOLUTE' | 'PERCENTAGE'
	startDate: Date
	endDate?: any
	title: string
	description: string
	created: Date
	updated: Date
	usedCode?: string
	__v: number
}
