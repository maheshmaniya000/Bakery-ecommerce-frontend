import AppSEO from '@/components/App/SEO'
import { MeContainer } from '@/components/Me/MeContainer/MeContainer'
import UserDetailsForm from '@/components/Me/MeUser/UserDetails'
import React from 'react'

const details: React.FC = () => {
	return (
		<>
			<AppSEO title="My Details" noIndex />
			<MeContainer
				render={(user) => (
					<div>
						<h3 className="page-title">My details</h3>
						{user && <UserDetailsForm user={user} />}
					</div>
				)}
			/>
		</>
	)
}

export default details
