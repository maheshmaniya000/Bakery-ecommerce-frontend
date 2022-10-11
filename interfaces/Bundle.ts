import { Product } from './Product'

export interface Bundle {
	_id: string
	name: string
	description: string
	slug: string
	image: string
	images: string[]
	price: number
	products: BundleProduct[]
}

export interface BundleProduct {
	_id: string
	product: Product
	variant?: string
	qty: number
}
