import Router from 'next/router'

import Popover from '../PopOver/PopOver'
import { logout } from '../../services/auth'
import { useUser } from '../../data/useUser'

interface Props {
	onClose: () => void
}

export const ProfileMenu = ({ onClose }: Props) => {
	const { mutate: userMutate } = useUser({})

	async function handleSignout() {
		await logout()
		userMutate()
		Router.push('/')
	}

	return (
		<Popover onClose={() => onClose()}>
			<div onClick={() => handleSignout()}>Logout</div>
		</Popover>
	)
}
