export interface Category {
	_id: string
	active: boolean
	products: string[]
	name: string
	created: Date
	updated: Date
	__v: number
	slug: string
}

export interface Stock {
	qty: number
	date: string
}

export interface Variant {
	images: string[]
	restocks: number[]
	_id: string
	price: number
	size: string
	isAutoRestock: boolean
	stocks: Stock[]
}

export interface Product {
	_id: string
	categories: Category[]
	tags: string[]
	images: string[]
	name: string
	description: string
	price: number
	mainImage: string
	variants: Variant[]
	stocks: any[]
	created: Date
	updated: Date
	__v: number
	active: boolean
	basePrice: number
	isSpecial: boolean
	isNoCakeText: boolean
	slug: string
	id: string
	type: string
}
