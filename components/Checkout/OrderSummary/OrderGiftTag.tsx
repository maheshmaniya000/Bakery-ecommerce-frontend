import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import styled from '@emotion/styled'

import { StyledSubmitButton } from '@/components/Authentication/Auth.styled'
import ErrorField from '@/components/Form/FormErrorField'
import { StyledTextArea } from '@/styles/elements/form'
import { Order } from '@/components/Me/MyOrders/interface/order'
import { updateGiftTag } from 'services/checkout'
import { useState } from 'react'
import { ButtonLoading } from '@/styles/elements/button-loading'
import { mutate } from 'swr'

const StyledForm = styled(Form)`
	margin-top: 50px;
	background: #f4f1ed;
	border: 1px solid #7c7167;
	padding: 30px;
`

const Submit = styled(StyledSubmitButton)`
	width: 150px;
	height: 40px;
	margin-left: auto;
`

const SubmitContainer = styled.div`
	width: 50%;
`

const Title = styled.div`
	font-weight: bold;
	font-size: 1.7rem;
	line-height: 2rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const Label = styled.label`
	margin-top: 20px;
	display: block;
`

const TextAreaContainer = styled.div`
	padding: 10px;
	margin-top: 6px;
	background-color: #fff;
	border: 1px solid #7c7167;
	border-radius: 4px;
	width: 50%;

	@media (max-width: 768px) {
		width: 100%;
	}
`

const Count = styled.div`
	text-align: right;
	margin-left: auto;
`

const validationSchema = Yup.object().shape({
	message: Yup.string()
		.max(200, 'Not more than 200 characters')
		.required('Message is required!'),
	note: Yup.string().max(150, 'Not more than 150 characters'),
})

interface Props {
	order: Order
	onClose: () => void
}

const OrderGiftTag = ({ order, onClose }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async (values: { message: string }) => {
		setIsLoading(true)
		try {
			await updateGiftTag(order._id, {
				giftTag: values.message,
			})
			await mutate(process.env.API_URL + '/orders/' + order._id)
			setIsLoading(false)
			onClose()
		} catch (error) {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<Formik
				initialValues={{
					message: order.giftMessage,
					note: order.note || '',
				}}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched, values }) => (
					<StyledForm>
						<Title>
							Leave a personal message for your recipient here!
						</Title>

						<Label htmlFor="message"></Label>
						<TextAreaContainer>
							<StyledTextArea
								component="textarea"
								name="message"
								placeholder="Write something"
							/>
							<Count>{values.message.length}/200</Count>
						</TextAreaContainer>
						{errors.message && touched.message && (
							<ErrorField error={errors.message} />
						)}

						<SubmitContainer>
							<Submit type="submit">
								{isLoading ? <ButtonLoading /> : <>Save</>}
							</Submit>
						</SubmitContainer>
					</StyledForm>
				)}
			</Formik>
		</div>
	)
}

export default OrderGiftTag
