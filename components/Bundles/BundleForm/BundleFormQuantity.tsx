import { StyledFormGroup } from '@/components/ProductDetail/ProductDetail.style'
import Counter from '@/components/ui/Counter/Counter'
import { useFormikContext } from 'formik'

import { BundleFormValues } from './BundleFormValues'

export function BundleFormQuantity() {
	const { values, setFieldValue } = useFormikContext<BundleFormValues>()

	return (
		<StyledFormGroup
			style={{
				marginBottom: '20px',
			}}
		>
			<Counter
				min={1}
				max={200}
				initialValue={values.quantity}
				onChange={(q) => {
					setFieldValue('quantity', q)
				}}
			/>
		</StyledFormGroup>
	)
}
