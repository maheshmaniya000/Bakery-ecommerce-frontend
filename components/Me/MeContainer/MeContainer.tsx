import { useUser } from 'data/useUser'
import {
	Logout,
	StyledMeContainer,
	StyledMeNavigation,
	UserName,
	Title,
} from './MeContainer.style'
import Link from 'next/link'
import { Anchor } from '../../../styles/elements'
import { StyledPageContainer } from '../../../styles/elements/container'
import { useRouter } from 'next/router'
import { logout } from 'services/auth'
import { User } from '../interface/user.interface'

interface Props {
	render: (user: User) => void
}

export const MeContainer: React.FC<Props> = ({ render }) => {
	const router = useRouter()
	const { loading, user, mutate: userMutate } = useUser({
		redirectTo: '/',
	})

	async function handleSignOut() {
		await logout()
		userMutate()
		router.push('/')
	}

	if (loading) {
		return (
			<StyledPageContainer>
				<div>Loading...</div>
			</StyledPageContainer>
		)
	}

	return (
		<main>
			<StyledMeContainer>
				<div>
					<div>
						<UserName>
							<h1 className="title">Hello {user?.firstName} </h1>
							<Logout onClick={handleSignOut}>Logout</Logout>
						</UserName>
						{render(user)}
					</div>
				</div>
				<StyledMeNavigation className="account-navigation">
					<li>
						<Title>My account</Title>
					</li>
					<li>
						<Link href="/me/orders" passHref>
							<Anchor isActive={router.asPath === '/me/orders'}>
								My orders
							</Anchor>
						</Link>
					</li>
					<li>
						<Link href="/me/details" passHref>
							<Anchor isActive={router.asPath === '/me/details'}>
								My details
							</Anchor>
						</Link>
					</li>
					<li>
						<Link href="/me/securities" passHref>
							<Anchor
								isActive={router.asPath === '/me/securities'}
							>
								Log in and securities
							</Anchor>
						</Link>
					</li>
				</StyledMeNavigation>
			</StyledMeContainer>
		</main>
	)
}
