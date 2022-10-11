import ErrorField from '@/components/Form/FormErrorField'
import { StyledButton } from '@/styles/elements'
import { StyledField } from '@/styles/elements/form'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import { StyledTextArea } from '@/styles/elements/form'
import * as Yup from 'yup'

import styles from './index.module.scss'

const FormField = styled(StyledField)`
	width: 400px;
	max-width: 100%;
	margin-top: 20px;
	border: 1px solid #7c7167;
`

const TextAreaContainer = styled.div`
	padding: 10px;
	margin-top: 20px;
	background-color: #fff;
	border: 1px solid #7c7167;
	border-radius: 4px;
	width: 400px;
	max-width: 100%;
`

const Submit = styled(StyledButton)`
	margin-top: 20px;
	width: 400px;
	max-width: 100%;
`

const Error = styled.div`
	width: 400px;
	max-width: 100%;
	text-align: left;
`

const initialValues = {
	name: '',
	email: '',
	mobileNo: '',
	message: '',
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required!'),
	mobileNo: Yup.string()
		.matches(/^[0-9]{8}$/, 'Invalid mobile number')
		.required('Mobile Number is required'),
	message: Yup.string().required('Message is required'),
})

const ContactUsForm = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ errors, touched, values, setFieldValue }) => (
				<Form className={styles.container}>
					<h2 className={styles.title}>Let&#39;s get in touch</h2>

					<p className={styles.info}></p>

					<FormField name="name" type="text" placeholder="Name" />
					{errors.name && touched.name && (
						<Error>
							<ErrorField error={errors.name} />
						</Error>
					)}

					<FormField name="email" type="email" placeholder="Email" />
					{errors.email && touched.email && (
						<Error>
							<ErrorField error={errors.email} />
						</Error>
					)}

					<FormField
						value={values.mobileNo}
						type="number"
						placeholder="Mobile no"
						onChange={(e) => {
							const temp = e.target.value

							if (temp.length <= 8) {
								setFieldValue('mobileNo', temp)
							}
						}}
					/>
					{errors.mobileNo && touched.mobileNo && (
						<Error>
							<ErrorField error={errors.mobileNo} />
						</Error>
					)}

					<TextAreaContainer>
						<StyledTextArea
							component="textarea"
							name="message"
							placeholder="Write something"
						/>
					</TextAreaContainer>
					{errors.message && touched.message && (
						<Error>
							<ErrorField error={errors.message} />
						</Error>
					)}

					<Submit type="submit">Submit</Submit>
				</Form>
			)}
		</Formik>
	)
}

export default ContactUsForm
