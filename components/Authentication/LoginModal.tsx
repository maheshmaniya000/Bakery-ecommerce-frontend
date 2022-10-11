import { Modal } from '@/components/Modal/Modal'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'

import ErrorField from '@/components/Form/FormErrorField'
import { StyledAuth } from '@/styles/elements/auth'
import { StyledField } from '@/styles/elements/form'
import { Anchor } from '@/styles/elements'
import {
	StyledForgotPasswordText,
	StyledFormDivider,
	StyledFormGroup,
	StyledSubmitButton,
	StyledAuthFooter,
} from './Auth.styled'
import SocialLogin from '@/components/Authentication/SocialLogin'
import { useUser } from '../../data/useUser'
import { login } from '../../services/auth'
import { extractErrorMessage } from '../../utils/helper'
import { useContext, useState } from 'react'
import { ApplicationContext } from '../../context/ApplicationContext'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'

interface Props {
	toggleModal: (boolean) => void
	showModal?: boolean
}

const authSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required!'),
	password: Yup.string().required('Password is required!'),
})

const LoginModal = ({ toggleModal, showModal = false }: Props) => {
	const { setMessage, redirectLinkAfterRegister } = useContext(
		ApplicationContext
	)
	const { mutate } = useUser({
		redirectTo: redirectLinkAfterRegister,
		redirectIfFound: true,
	})

	const [error, setError] = useState('')

	async function handleGoogleLogin(data) {
		setError('')
		try {
			const { isLoggedIn } = await mutate(
				login({ ...data, type: 'CUSTOMER' })
			)
			if (isLoggedIn) {
				setMessage('Login Success!')
			} else {
				setError('Something went wrong!')
			}
		} catch (e) {
			setError(extractErrorMessage(e))
		}
	}

	return (
		<Modal setToggle={toggleModal} isToggled={showModal}>
			<StyledAuth>
				<h3 className="heading">Log in with</h3>

				<SocialLogin />

				<StyledFormDivider>or with</StyledFormDivider>
				{error && <ErrorHandler message={error} />}
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={authSchema}
					onSubmit={(values) => handleGoogleLogin(values)}
				>
					{({ errors, touched }) => (
						<Form>
							<StyledFormGroup>
								<StyledField
									name="email"
									type="email"
									placeholder="Email"
								/>
								{errors.email && touched.email && (
									<ErrorField error={errors.email} />
								)}
							</StyledFormGroup>

							<StyledFormGroup>
								<StyledField
									name="password"
									type="password"
									placeholder="Password"
								/>
								{errors.password && touched.password && (
									<ErrorField error={errors.password} />
								)}
							</StyledFormGroup>

							<StyledForgotPasswordText>
								<Link href="?action=forget-password">
									<Anchor>Forgot Password?</Anchor>
								</Link>
							</StyledForgotPasswordText>

							<StyledSubmitButton type="submit">
								Login
							</StyledSubmitButton>
						</Form>
					)}
				</Formik>

				<StyledAuthFooter>
					Do not have an account?{' '}
					<Link href="?action=register">
						<Anchor>Register Here</Anchor>
					</Link>
				</StyledAuthFooter>
			</StyledAuth>
		</Modal>
	)
}

export default LoginModal
