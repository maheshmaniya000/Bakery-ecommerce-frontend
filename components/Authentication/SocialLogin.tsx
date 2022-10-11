import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useContext, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { StyledSocialContainer } from './Auth.styled'
import { useUser } from '../../data/useUser'
import {
	facebookLogin,
	googleLogin,
	sendOtp,
	checkOtp,
} from '../../services/auth'
import { ApplicationContext } from '../../context/ApplicationContext'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'
import { extractErrorMessage } from '../../utils/helper'
import ConfirmEmailModal from './ConfirmEmailModal'
import ConfirmOTPModal from './ConfirmOTPModal'

const SocialLogin = () => {
	const { mutate } = useUser({
		redirectTo: '/',
		redirectIfFound: true,
	})

	const [error, setError] = useState('')
	const [confirmEmail, setConfirmEmail] = useState('')
	const [fbData, setFbData] = useState({}) // for confirm email func if fb won't provide email

	const { setMessage } = useContext(ApplicationContext)
	const [shownConfirmModal, setShownConfirmModal] = useState(false)
	const [shownOTPModal, setShownOTPModal] = useState(false)

	async function handleGoogleLogin(data) {
		setError('')

		try {
			const { profileObj } = data
			const { isLoggedIn } = await mutate(
				googleLogin({
					...profileObj,
					type: 'CUSTOMER',
					providerData: profileObj,
				})
			)
			if (isLoggedIn) {
				// dispatch message
				setMessage('Login Success!')
			}
		} catch (e) {
			setError(extractErrorMessage(e))
		}
	}

	async function handleFacebookLogin(data) {
		setError('')

		try {
			if (!data.status) {
				setFbData(data)

				const { isLoggedIn } = await mutate(
					facebookLogin({
						...data,
						type: 'CUSTOMER',
						providerData: data,
					})
				)

				if (isLoggedIn) {
					// dispatch message
					setMessage('Login Success!')
				}
			}
		} catch (err) {
			const { data } = err.response

			// check email required code
			if (data && data?.status === 410) {
				setShownConfirmModal(true)
			} else {
				setError(extractErrorMessage(err))
			}
		}
	}

	function handleConfirmEmailSubmit(values) {
		setConfirmEmail(values.email)

		sendOtp(values.email).then(() => {
			setShownOTPModal(true)
		})
	}

	function handleOTPSubmit(value) {
		checkOtp(confirmEmail, value).then(({ data }) => {
			if (data.valid) {
				handleFacebookLogin({ ...fbData, email: confirmEmail })
			} else {
				window.alert('Invalid OPT!')
			}
		})
	}

	return (
		<StyledSocialContainer>
			<div className="social-button-wrapper">
				{error && <ErrorHandler message={error} />}
				<FacebookLogin
					appId={process.env.FB_CLIENT_ID}
					callback={(response) => handleFacebookLogin(response)}
					render={(renderProps) => (
						<button
							className="social-button "
							onClick={renderProps.onClick}
						>
							<img
								src="/images/icons/facebook.svg"
								alt="login with Facebook"
								className="social-icon facebook"
							/>
							{'    '}
							FACEBOOK
						</button>
					)}
					fields="name,email,picture"
					autoLoad={false}
					disableMobileRedirect={true}
				/>

				<GoogleLogin
					clientId={process.env.GOOGLE_CLIENT_ID}
					render={(renderProps) => (
						<button
							className="social-button google"
							onClick={renderProps.onClick}
						>
							<img
								src="/images/icons/google.svg"
								alt="login with Google"
								className="social-icon google"
							/>
							{'    '}
							GOOGLE
						</button>
					)}
					onSuccess={(data) => handleGoogleLogin(data)}
					cookiePolicy={'single_host_origin'}
				/>
			</div>

			<ConfirmEmailModal
				showModal={shownConfirmModal}
				onSubmit={handleConfirmEmailSubmit}
				toggleModal={() => setShownConfirmModal(false)}
			/>

			<ConfirmOTPModal
				showModal={shownOTPModal}
				onSubmit={handleOTPSubmit}
				toggleModal={() => setShownOTPModal(false)}
			/>
		</StyledSocialContainer>
	)
}

export default SocialLogin
