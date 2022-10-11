import styled from '@emotion/styled'
import { useUser } from 'data/useUser'
import { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { deleteAccount, linkFacebook, linkGoogle } from 'services/auth'

import { User } from '../../interface/user.interface'

const Title = styled.div`
	font-weight: bold;
	font-size: 1.8rem;
	line-height: 2rem;
	letter-spacing: 0.05em;
	color: #7e5000;
	margin-top: 50px;
`

const Content = styled.div`
	margin-top: 30px;
	display: grid;
	grid-template-columns: 26px minmax(0, 1fr) auto;
	gap: 20px;
`

const SocialIcon = styled.img`
	width: 26px;
	height: 26px;
	object-fit: contain;
`

const SocialTitle = styled.div`
	font-weight: bold;
	font-size: 1.8rem;
	line-height: 2rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const SocialUserName = styled.div`
	margin-top: 10px;
	font-size: 1.5rem;
	line-height: 1.6rem;
	letter-spacing: 0.05em;
	color: #7c7167;
`

const SocialActions = styled.div`
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.7rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
	cursor: pointer;
`

interface Props {
	user: User
}

const SocialSecurities: React.FC<Props> = ({ user }) => {
	const { mutate } = useUser({
		redirectTo: '/',
	})

	const [googleLogin, setGoogleLogin] = useState<any>({})
	const [fbLogin, setFbLogin] = useState<any>({})

	useEffect(() => {
		if (user && user.accounts) {
			setGoogleLogin(
				user.accounts.find((acc) => acc.provider === 'GOOGLE')
			)

			setFbLogin(user.accounts.find((acc) => acc.provider === 'FACEBOOK'))
		}
	}, [user])

	function handleDeleteAccount(id) {
		if (window.confirm('Are you sure?')) {
			deleteAccount(id, user.token).then(() => {
				mutate()
			})
		}
	}

	async function handleFacebookLogin(data) {
		linkFacebook(
			{
				...data,
				type: 'CUSTOMER',
				providerData: data,
			},
			user.token
		).then(() => {
			mutate()
		})
	}

	async function handleGoogleLogin(data) {
		const { profileObj } = data

		linkGoogle(
			{
				...profileObj,
				type: 'CUSTOMER',
				providerData: profileObj,
			},
			user.token
		).then(() => {
			mutate()
		})
	}

	return (
		<div>
			<Title>Social media</Title>
			<Content>
				<SocialIcon src="/images/icons/facebook.svg" alt="social" />
				<div>
					<SocialTitle>Facebook</SocialTitle>
					{fbLogin && (
						<SocialUserName>
							{fbLogin?.providerData?.name}
						</SocialUserName>
					)}
				</div>

				{!fbLogin && (
					<FacebookLogin
						appId={process.env.FB_CLIENT_ID}
						callback={(response) => handleFacebookLogin(response)}
						render={(renderProps) => (
							<SocialActions onClick={renderProps.onClick}>
								Connect
							</SocialActions>
						)}
						fields="name,email,picture"
						autoLoad={false}
						disableMobileRedirect={true}
					/>
				)}

				{/* {fbLogin && user.auth.provider !== 'FACEBOOK' && (
					<SocialActions
						onClick={() => handleDeleteAccount(fbLogin._id)}
					>
						Disconnect
					</SocialActions>
				)} */}

				{fbLogin && user.auth.provider === 'FACEBOOK' && (
					<SocialActions />
				)}

				<SocialIcon src="/images/icons/google.svg" alt="social" />
				<div>
					<SocialTitle>Google</SocialTitle>
					{googleLogin && (
						<SocialUserName>
							{googleLogin?.providerData?.givenName}
						</SocialUserName>
					)}
				</div>
				{/* {googleLogin && user.auth?.provider !== 'GOOGLE' && (
					<SocialActions
						onClick={() => handleDeleteAccount(googleLogin._id)}
					>
						Disconnect
					</SocialActions>
				)} */}

				{!googleLogin && (
					<GoogleLogin
						clientId={process.env.GOOGLE_CLIENT_ID}
						render={(renderProps) => (
							<SocialActions onClick={renderProps.onClick}>
								Connect
							</SocialActions>
						)}
						onSuccess={(data) => handleGoogleLogin(data)}
						cookiePolicy={'single_host_origin'}
					/>
				)}
			</Content>
		</div>
	)
}

export default SocialSecurities
