import { Modal } from '@/components/Modal/Modal'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import ErrorField from '@/components/Form/FormErrorField'
import { StyledAuth } from '@/styles/elements/auth'
import { StyledField } from '@/styles/elements/form'

import {
	StyledSubmitButton,
	StyledFormDescription,
	StyledFormGrid,
	StyledFormGroup,
} from '@/components/Authentication/Auth.styled'

interface Props {
	toggleModal: (boolean) => void
	onSubmit: (values, helpers) => void
	showModal?: boolean
}

const ResetPasswordModal = ({
	toggleModal,
	showModal = false,
	onSubmit,
}: Props) => {
	const authSchema = Yup.object().shape({
		password: Yup.string().required('Password is required!'),
		confirm: Yup.string()
			.oneOf(
				[Yup.ref('password'), null],
				'Confirm password must match with password'
			)
			.required('Confirm password is required!'),
	})

	return (
		<Modal setToggle={toggleModal} isToggled={showModal}>
			<StyledAuth>
				<h3 className="heading">Reset Password</h3>

				<StyledFormDescription>
					Set your new password and you are good to go
				</StyledFormDescription>

				<Formik
					initialValues={{ password: '', confirm: '' }}
					validationSchema={authSchema}
					onSubmit={onSubmit}
				>
					{({ errors, touched }) => (
						<Form>
							<StyledFormGrid>
								<StyledFormGroup>
									<StyledField
										name="password"
										type="password"
										placeholder="Password"
									/>
									{errors.password && touched.password && (
										<ErrorField
											error={errors.password.toString()}
										/>
									)}
								</StyledFormGroup>
								<StyledFormGroup>
									<StyledField
										name="confirm"
										type="password"
										placeholder="Confirm Password"
									/>
									{errors.confirm && touched.confirm && (
										<ErrorField
											error={errors.confirm.toString()}
										/>
									)}
								</StyledFormGroup>
							</StyledFormGrid>

							<StyledSubmitButton>Submit</StyledSubmitButton>
						</Form>
					)}
				</Formik>
			</StyledAuth>
		</Modal>
	)
}

export default ResetPasswordModal
