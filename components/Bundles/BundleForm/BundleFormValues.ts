import { BundleProduct } from 'interfaces/Bundle'

interface BundleFormProduct extends BundleProduct {
	candles: { label: string; value: number }
	knife: { label: string; value: number }
	cakeText: string
}

export type BundleFormValues = {
	quantity: number
	isBuyNow: boolean
	isOutOfStock: boolean
	products: BundleFormProduct[]
}
