import { Modal } from '@/components/Modal/Modal'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import ErrorField from '@/components/Form/FormErrorField'
import { StyledAuth } from '@/styles/elements/auth'
import { StyledField } from '@/styles/elements/form'
import {
	StyledSubmitButton,
	StyledFormGroup,
	StyledFormDescription,
} from './Auth.styled'

interface Props {
	toggleModal: (boolean) => void
	onSubmit: (values, helpers) => void
	showModal?: boolean
}

const ForgetPasswordModal = ({
	toggleModal,
	showModal = false,
	onSubmit,
}: Props) => {
	const authSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email address is required!'),
	})

	return (
		<Modal setToggle={toggleModal} isToggled={showModal}>
			<StyledAuth>
				<h3 className="heading">Oops did you forget your password?</h3>

				<StyledFormDescription>
					Enter your email address below and we will send you a
					one-time password to reset your password.
				</StyledFormDescription>

				<Formik
					initialValues={{ email: '' }}
					validationSchema={authSchema}
					onSubmit={onSubmit}
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
									<ErrorField
										error={errors.email.toString()}
									/>
								)}
							</StyledFormGroup>

							<StyledSubmitButton type="submit">
								Submit
							</StyledSubmitButton>
						</Form>
					)}
				</Formik>
			</StyledAuth>
		</Modal>
	)
}

export default ForgetPasswordModal
