import { Modal } from '@/components/Modal/Modal'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { useContext, useState } from 'react'
import Router, { useRouter } from 'next/router'

import { ApplicationContext } from '../../context/ApplicationContext'

import ErrorField from '@/components/Form/FormErrorField'
import { StyledAuth } from '@/styles/elements/auth'
import { StyledField } from '@/styles/elements/form'
import { Anchor } from '@/styles/elements'
import {
	StyledFormDivider,
	StyledFormGroup,
	StyledSubmitButton,
	StyledAuthFooter,
	StyledFormGrid,
} from './Auth.styled'
import SocialLogin from '@/components/Authentication/SocialLogin'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'
import { checkOtp, registerUser, sendOtp } from '../../services/auth'
import { extractErrorMessage, useIsMobile } from '../../utils/helper'
import ConfirmOTPModal from './ConfirmOTPModal'

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const authSchema = Yup.object().shape({
	firstName: Yup.string().required('First Name is required!'),
	lastName: Yup.string().required('Last Name is required!'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required!'),
	mobileNo: Yup.string()
		.matches(/^[0-9]{8}$/, 'Invalid mobile number')
		.required('Mobile Number is required'),
	password: Yup.string()
		.min(8, 'Must be at least ${min} characters.')
		.required('Password is required!'),
	confirm: Yup.string()
		.oneOf(
			[Yup.ref('password'), null],
			'Confirm password must match with password'
		)
		.required('Confirm password is required!'),
})

interface Props {
	toggleModal: (boolean) => void
	showModal?: boolean
}

const RegisterModal = ({ toggleModal, showModal = false }: Props) => {
	const router = useRouter()
	const [error, setError] = useState('')
	const [shownOTPModal, setShownOTPModal] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
	})

	const { setMessage, orderPayload } = useContext(ApplicationContext)
	const isMobile = useIsMobile()

	async function handleLogin(body) {
		setFormData(body)

		sendOtp(body.email)
			.then(() => {
				setShownOTPModal(true)
			})
			.catch((e) => {
				setError(extractErrorMessage(e))
			})
	}

	async function register(data) {
		setError('')
		try {
			await registerUser(data)
			setMessage('Register successfully!')
			Router.push('?action=sign-in')
		} catch (e) {
			setError(extractErrorMessage(e))
		}
	}

	function handleOTPSubmit(otp) {
		checkOtp(formData.email, otp).then(({ data }) => {
			setShownOTPModal(false)

			if (!data.valid) {
				setError('Invalid OTP')
			} else {
				register({ ...formData, otp })
			}
		})
	}

	return (
		<Modal
			setToggle={toggleModal}
			isToggled={showModal}
			style={{ paddingTop: isMobile ? '50vh' : 0 }}
		>
			<StyledAuth>
				<h3 className="heading">Register with</h3>
				{router.query.from !== 'order' && (
					<>
						<SocialLogin />
						<StyledFormDivider>or with</StyledFormDivider>
					</>
				)}

				{error && <ErrorHandler message={error} />}

				<Formik
					initialValues={{
						email: orderPayload?.sender?.email || '',
						password: '',
						firstName: orderPayload?.sender?.firstName || '',
						lastName: orderPayload?.sender?.lastName || '',
						confirm: '',
						mobileNo: orderPayload?.sender?.mobileNo || '',
					}}
					validationSchema={authSchema}
					onSubmit={(values) => handleLogin(values)}
				>
					{({ errors, touched, handleChange, setFieldValue }) => (
						<Form>
							<StyledFormGrid>
								<StyledFormGroup>
									<StyledField
										name="firstName"
										type="text"
										placeholder="First Name"
										disabled={
											!!orderPayload?.sender?.firstName
										}
										readOnly={
											!!orderPayload?.sender?.firstName
										}
									/>
									{errors.firstName && touched.firstName && (
										<ErrorField
											error={errors.firstName as string}
										/>
									)}
								</StyledFormGroup>

								<StyledFormGroup>
									<StyledField
										name="lastName"
										type="text"
										placeholder="Last Name"
										disabled={
											!!orderPayload?.sender?.lastName
										}
										readOnly={
											!!orderPayload?.sender?.lastName
										}
									/>
									{errors.lastName && touched.lastName && (
										<ErrorField
											error={errors.lastName as string}
										/>
									)}
								</StyledFormGroup>
							</StyledFormGrid>

							<StyledFormGroup>
								<StyledField
									name="email"
									type="email"
									placeholder="Email"
									disabled={!!orderPayload?.sender?.email}
									readOnly={!!orderPayload?.sender?.email}
								/>
								{errors.email && touched.email && (
									<ErrorField
										error={errors.email as string}
									/>
								)}
							</StyledFormGroup>

							<StyledFormGroup>
								<StyledField
									name="mobileNo"
									type="tel"
									placeholder="Mobile no"
									onChange={(e) => {
										// restrict input for 8 number max
										// restrict input for 8 number max
										const { value } = e.target

										if (
											value.length === 1 &&
											value !== '9' &&
											value !== '8'
										) {
											setFieldValue('senderMobileNo', '')

											return false
										}

										if (
											// allow for empty string
											value === '' ||
											(value.length <= 8 &&
												!!value.match(/^\d+$/))
										) {
											handleChange(e)
										}

										return false
									}}
									disabled={!!orderPayload?.sender?.mobileNo}
									readOnly={!!orderPayload?.sender?.mobileNo}
								/>
								{errors.mobileNo && touched.mobileNo && (
									<ErrorField
										error={errors.mobileNo as string}
									/>
								)}
							</StyledFormGroup>

							<StyledFormGrid>
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

								<StyledFormGroup>
									<StyledField
										name="confirm"
										type="password"
										placeholder="Confirm Password"
									/>
									{errors.confirm && touched.confirm && (
										<ErrorField error={errors.confirm} />
									)}
								</StyledFormGroup>
							</StyledFormGrid>

							<StyledSubmitButton type="submit">
								Register
							</StyledSubmitButton>
						</Form>
					)}
				</Formik>

				<StyledAuthFooter>
					Have an account?{' '}
					<Link href="?action=sign-in">
						<Anchor>Log in here</Anchor>
					</Link>
				</StyledAuthFooter>
			</StyledAuth>

			<ConfirmOTPModal
				showModal={shownOTPModal}
				onSubmit={handleOTPSubmit}
				toggleModal={() => setShownOTPModal(false)}
			/>
		</Modal>
	)
}

export default RegisterModal
