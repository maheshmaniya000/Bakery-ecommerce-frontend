import { Product } from './Product'

export interface SliceBox {
	_id: string
	products: [
		{
			product: Product
			qty: number
			price: number
		}
	]
	option: SliceBoxOption
	// qty: number
	quantity: number
	total: number
}

export interface SliceBoxCart {
	product: Product
	qty: number
}

export interface SliceBoxOption {
	_id: string
	name: string
	image: string
	description: string
	min: number
	max: number
}
