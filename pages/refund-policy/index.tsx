import AppSEO from '@/components/App/SEO'
import SiteInfo from '@/components/SiteInfo'
import React from 'react'

import { useRefundPolicy } from 'data/useRefundPolicy'

const index = () => {
	const { data } = useRefundPolicy()

	return (
		<>
			<AppSEO title="Refund Policy" />
			<div>
				<SiteInfo>
					<div dangerouslySetInnerHTML={{ __html: data }} />
				</SiteInfo>
			</div>
		</>
	)
}

export default index
