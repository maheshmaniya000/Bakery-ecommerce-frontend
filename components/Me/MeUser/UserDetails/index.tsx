import ErrorField from '@/components/Form/FormErrorField'
import { StyledButton } from '@/styles/elements'
import { StyledField } from '@/styles/elements/form'
import styled from '@emotion/styled'
import { ApplicationContext } from 'context/ApplicationContext'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { updateProfile } from 'services/auth'
import * as Yup from 'yup'

import { User } from '../../interface/user.interface'

const FormField = styled(StyledField)`
	width: 400px;
	max-width: 100%;
	margin-top: 20px;
	border: 1px solid #7c7167;
`

const Submit = styled(StyledButton)`
	margin-top: 50px;
	width: 300px;
	max-width: 100%;
`

const FieldContainer = styled.div`
	width: 400px;
	max-width: 100%;
	display: grid;
	column-gap: 24px;
	grid-template-columns: repeat(2, minmax(0, 50%));
`

interface Props {
	user: User
}

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('First Name is required!'),
	lastName: Yup.string().required('Last Name is required!'),
	// email: Yup.string()
	// 	.email('Invalid email address')
	// 	.required('Email address is required!'),
	mobileNo: Yup.string()
		.matches(/^[0-9]{8}$/, 'Invalid mobile number')
		.required('Mobile Number is required'),
})

const UserDetailsForm = ({ user }: Props) => {
	const { setMessage } = useContext(ApplicationContext)

	const handleSubmit = (values) => {
		updateProfile(values, user.token).then(() => {
			setMessage('Profile updated!')
		})
	}

	return (
		<Formik
			initialValues={{
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				mobileNo: user.mobileNo,
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, handleChange }) => (
				<Form>
					<FieldContainer>
						<div>
							<FormField
								name="firstName"
								type="text"
								placeholder="First name"
							/>
							{errors.firstName && touched.firstName && (
								<ErrorField
									error={errors.firstName.toString()}
								/>
							)}
						</div>
						<div>
							<FormField
								name="lastName"
								type="text"
								placeholder="Last name"
							/>
							{errors.lastName && touched.lastName && (
								<ErrorField
									error={errors.lastName.toString()}
								/>
							)}
						</div>
					</FieldContainer>

					<FormField
						name="mobileNo"
						type="tel"
						placeholder="Mobile no"
						onChange={(e) => {
							// restrict input for 8 number max
							const { value } = e.target
							if (
								// allow for empty string
								value === '' ||
								(value.length <= 8 && !!value.match(/^\d+$/))
							) {
								handleChange(e)
							}
							return false
						}}
					/>
					{errors.mobileNo && touched.mobileNo && (
						<ErrorField error={errors.mobileNo.toString()} />
					)}

					{/* <FormField name="email" type="email" placeholder="Email" />
					{errors.email && touched.email && (
						<ErrorField error={errors.email} />
					)} */}

					<Submit type="submit">SAVE</Submit>
				</Form>
			)}
		</Formik>
	)
}

export default UserDetailsForm
