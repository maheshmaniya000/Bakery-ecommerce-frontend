import { StyledSubmitButton } from '@/components/Authentication/Auth.styled'
import SizeSelect from '@/components/SizeSelect/SizeSelect'
import TextArea from '@/components/TextArea/TextArea'
import { Form, Formik } from 'formik'
import { FormControl, FormGroup } from './styles/BundleFormProducts.styles'

import { FC } from 'react'

export interface FormValues {
	candles: { value: number; label: string }
	knife: { value: number; label: string }
	cakeText: string
}

type Props = {
	initialValues: FormValues
	isNoCakeText: boolean
	onSubmit: (values: FormValues) => void
}

export const BundleFormSpecials: FC<Props> = ({
	initialValues,
	isNoCakeText,
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={true}
			onSubmit={onSubmit}
		>
			<Form>
				<FormGroup>
					Candles (standard size):
					<FormControl
						style={{
							width: '200px',
						}}
					>
						<SizeSelect
							options={[...new Array(10)].map((_, index) => ({
								value: index,
								label: index.toString(),
							}))}
							optionsMatcher={['label', 'value']}
							label=""
							isSearchable={false}
							name={`candles`}
						/>
					</FormControl>
				</FormGroup>

				<FormGroup>
					Cake Knife:
					<FormControl
						style={{
							width: '200px',
						}}
					>
						<SizeSelect
							options={[
								{
									value: false,
									label: 'No',
								},
								{
									value: true,
									label: 'Yes',
								},
							]}
							optionsMatcher={['label', 'value']}
							label=""
							defaultSelect
							isSearchable={false}
							name={`knife`}
						/>
					</FormControl>
				</FormGroup>

				{!isNoCakeText && (
					<FormGroup>
						Cake Text (Alphanumeric only)
						<FormControl
							style={{
								marginTop: '-2px',
							}}
						>
							<TextArea name={`cakeText`} />
						</FormControl>
					</FormGroup>
				)}

				<StyledSubmitButton type="submit">Update</StyledSubmitButton>
			</Form>
		</Formik>
	)
}
