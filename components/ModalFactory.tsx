import { useRouter } from 'next/router'
import LoginModal from '@/components/Authentication/LoginModal'
import RegisterModal from '@/components/Authentication/RegisterModal'
import ForgetPasswordModal from '@/components/Authentication/ForgetPasswordModal'
import ResetPasswordModal from '@/components/Authentication/ResetPasswordModal'
import { sendResetPassword, resetPassword } from 'services/auth'
import { useContext } from 'react'
import { ApplicationContext } from 'context/ApplicationContext'

/**
 * centralized component for creating model windows.
 * each model will be control their visibility from the query string with `action`
 * @constructor
 */
function ModalFactory() {
	const { setMessage } = useContext(ApplicationContext)

	const router = useRouter()
	const { action, token } = router.query

	function dismissModal() {
		router.push(router.pathname)
	}

	async function handleForgetPasswordSubmit(values, helpers) {
		try {
			await sendResetPassword(values)

			dismissModal()
			setMessage(`Reset password instruction sent to ${values.email}!`)
		} catch ({ response }) {
			helpers.setFieldError('email', response.data.message)
		}
	}

	async function handleResetPasswordSubmit(values, helpers) {
		try {
			await resetPassword({ ...values, token })

			dismissModal()
			setMessage(`Password is successfully changed!`)
		} catch ({ response }) {
			helpers.setFieldError('password', response.data.message)
		}
	}

	switch (action) {
		case 'sign-in':
			return <LoginModal toggleModal={dismissModal} showModal={true} />
		case 'register':
			return <RegisterModal toggleModal={dismissModal} showModal={true} />
		case 'forget-password':
			return (
				<ForgetPasswordModal
					toggleModal={dismissModal}
					showModal={true}
					onSubmit={handleForgetPasswordSubmit}
				/>
			)
		case 'reset-password':
			return (
				<ResetPasswordModal
					toggleModal={dismissModal}
					onSubmit={handleResetPasswordSubmit}
					showModal={true}
				/>
			)
		// case 'confirm-otp':
		// 	return (
		// 		<ConfirmOTPModal toggleModal={dismissModal} showModal={true} />
		// 	)
		default:
			return null
	}
}

export default ModalFactory
