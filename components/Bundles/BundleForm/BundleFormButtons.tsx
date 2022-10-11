import {
	StyledDetailBtnGroup,
	StyledSubmit,
} from '@/components/ProductDetail/ProductDetail.style'
import { useFormikContext } from 'formik'
import { BundleFormValues } from './BundleFormValues'

export function BundleFormButtons() {
	const { values, setFieldValue } = useFormikContext<BundleFormValues>()

	return (
		<StyledDetailBtnGroup>
			<StyledSubmit type="submit" disabled={values.isOutOfStock}>
				Add To Cart
			</StyledSubmit>

			<StyledSubmit
				type="submit"
				disabled={values.isOutOfStock}
				onClick={() => {
					setFieldValue('isBuyNow', true)
				}}
			>
				Buy Now
			</StyledSubmit>
		</StyledDetailBtnGroup>
	)
}
