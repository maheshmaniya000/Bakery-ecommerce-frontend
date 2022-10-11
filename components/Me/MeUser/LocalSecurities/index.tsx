import ErrorField from '@/components/Form/FormErrorField'
import { StyledButton } from '@/styles/elements'
import { StyledField } from '@/styles/elements/form'
import styled from '@emotion/styled'
import { ApplicationContext } from 'context/ApplicationContext'
import { useUser } from 'data/useUser'
import { Form, Formik } from 'formik'
import { useEffect, useState, useContext } from 'react'
import { setPassword, changePassword } from 'services/auth'
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

const PasswordContainer = styled.div`
	width: 620px;
	max-width: 100%;
	display: grid;
	column-gap: 24px;
	grid-template-columns: repeat(3, minmax(0, 33%));

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
	}
`

const SecondaryTitle = styled.h3`
	margin-top: 30px;
	font-weight: bold;
	font-size: 1.8rem;
	line-height: 2rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const StyledForm = styled(Form)`
	padding-bottom: 50px;
	border-bottom: 1px solid #e7d8c3;
`

const initialValues = {
	currentPassword: '',
	password: '',
	confirm: '',
}

interface Props {
	user: User
}

const SecuritiesForm: React.FC<Props> = ({ user }) => {
	const { setMessage } = useContext(ApplicationContext)

	const { mutate: userMutate } = useUser({
		redirectTo: '/',
	})

	const [hadEmailRegistered, setHadEmailRegistered] = useState(false)

	useEffect(() => {
		if (user && user.accounts) {
			const LocalProvider = user.accounts.find(
				(acc) => acc.provider === 'LOCAL'
			)

			setHadEmailRegistered(LocalProvider ? true : false)
		}
	}, [user])

	const handleSubmit = (values, actions) => {
		if (!hadEmailRegistered) {
			setPassword({ password: values.password }, user.token).then(() => {
				setMessage('Set Password!')
				userMutate()
			})
		} else {
			changePassword(
				{
					newPassword: values.password,
					currentPassword: values.currentPassword,
				},
				user.token
			)
				.then(() => {
					setMessage('Changed Password!')
				})
				.catch(({ response }) => {
					actions.setFieldError(
						'currentPassword',
						response.data.message
					)
				})
		}

		actions.resetForm()
	}

	const validationSchema = Yup.object().shape({
		currentPassword: hadEmailRegistered
			? Yup.string().required('Current password is required')
			: Yup.string(),
		password: Yup.string()
			.min(8, 'Must be at least ${min} characters.')
			.required('New password is required!'),
		confirm: Yup.string()
			.oneOf(
				[Yup.ref('password'), null],
				'Confirm password must match with password'
			)
			.required('Confirm password is required!'),
	})

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<StyledForm>
					<SecondaryTitle>
						{!hadEmailRegistered
							? 'Set password'
							: 'Change password'}
					</SecondaryTitle>
					<PasswordContainer>
						{hadEmailRegistered && (
							<div>
								<FormField
									name="currentPassword"
									type="password"
									placeholder="Current Password"
								/>
								{errors.currentPassword &&
									touched.currentPassword && (
										<ErrorField
											error={errors.currentPassword.toString()}
										/>
									)}
							</div>
						)}

						<div>
							<FormField
								name="password"
								type="password"
								placeholder="New Password"
							/>
							{errors.password && touched.password && (
								<ErrorField
									error={errors.password.toString()}
								/>
							)}
						</div>

						<div>
							<FormField
								name="confirm"
								type="password"
								placeholder="Confirm Password"
							/>
							{errors.confirm && touched.confirm && (
								<ErrorField error={errors.confirm.toString()} />
							)}
						</div>
					</PasswordContainer>

					<Submit type="submit">SAVE</Submit>
				</StyledForm>
			)}
		</Formik>
	)
}

export default SecuritiesForm
