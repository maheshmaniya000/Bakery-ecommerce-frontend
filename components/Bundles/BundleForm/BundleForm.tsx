import { StyledForm } from '@/components/ProductDetail/ProductDetail.style'
import { Form } from 'formik'
import { Bundle } from 'interfaces/Bundle'
import { BundleFormButtons } from './BundleFormButtons'

import { BundleFormEarliestDate } from './BundleFormEarliestDate'
import { BundleFormProducts } from './BundleFormProducts'
import { BundleFormQuantity } from './BundleFormQuantity'
import { BundleFormValues } from './BundleFormValues'

type Props = {
	bundle: Bundle
	onSubmit: (values: BundleFormValues) => void
}

export function BundleForm({ bundle, onSubmit }: Props) {
	const initialValues: BundleFormValues = {
		quantity: 1,
		isBuyNow: false,
		isOutOfStock: false,
		products: bundle.products.map((product) => ({
			...product,
			candles: { value: 0, label: '0' },
			cakeText: '',
			knife: { value: 0, label: 'No' },
		})),
	}

	return (
		<StyledForm
			initialValues={initialValues}
			enableReinitialize={true}
			onSubmit={onSubmit}
		>
			<Form>
				<BundleFormProducts />

				<BundleFormQuantity />

				<BundleFormEarliestDate />

				<BundleFormButtons />
			</Form>
		</StyledForm>
	)
}
