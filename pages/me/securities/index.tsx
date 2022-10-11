import AppSEO from '@/components/App/SEO'
import { MeContainer } from '@/components/Me/MeContainer/MeContainer'
import SecuritiesForm from '@/components/Me/MeUser/LocalSecurities'
import SocialSecurities from '@/components/Me/MeUser/SocialSecurities'
import React from 'react'

const Securities: React.FC = () => {
	return (
		<>
			<AppSEO title="Log in and Securities" noIndex />
			<MeContainer
				render={(user) => (
					<div>
						<h3 className="page-title">Log in and securities</h3>
						{user && (
							<>
								<SecuritiesForm user={user} />
								<SocialSecurities user={user} />
							</>
						)}
					</div>
				)}
			/>
		</>
	)
}

export default Securities
