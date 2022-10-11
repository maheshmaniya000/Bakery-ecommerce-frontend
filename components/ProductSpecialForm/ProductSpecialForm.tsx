import TextArea from '@/components/TextArea/TextArea'
import {
	StyledFormGroup,
	StyledShortLabel,
} from '../ProductDetail/ProductDetail.style'
import SizeSelect from '@/components/SizeSelect/SizeSelect'
import { useFormikContext } from 'formik'
import ErrorField from '../Form/FormErrorField'

type Props = {
	isNoCakeText?: boolean
}

export const ProductSpecialForm = ({ isNoCakeText = false }: Props) => {
	const { errors, touched } = useFormikContext<any>()

	return (
		<>
			<span>Candles (standard size)</span>
			<StyledFormGroup>
				<SizeSelect
					options={[...new Array(10)].map((_, index) => ({
						value: index,
						label: index.toString(),
					}))}
					label=""
					name="candles"
				/>
			</StyledFormGroup>

			<StyledShortLabel style={{ paddingBottom: '0' }}>
				Need a cake knife?
			</StyledShortLabel>

			<StyledFormGroup>
				<SizeSelect
					options={[
						{
							value: 1,
							label: 'Yes',
						},
						{
							value: 0,
							label: 'No',
						},
					]}
					label=""
					name="knifes"
				/>
			</StyledFormGroup>

			{errors.knifes && touched.knifes && (
				<ErrorField error={errors.knifes + ''} />
			)}

			{/* <StyledShortLabel style={{ marginBottom: '0px' }}>
				Need a cake knife?{' '}
				<Field type="checkbox" value="yes" name="knifes" />
			</StyledShortLabel> */}

			{!isNoCakeText && (
				<>
					<StyledShortLabel style={{ paddingBottom: '0' }}>
						<span>Cake Text (Alphanumeric only)</span>
					</StyledShortLabel>
					<TextArea name="message" />
				</>
			)}
		</>
	)
}
