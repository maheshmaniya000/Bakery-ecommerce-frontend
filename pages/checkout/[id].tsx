import { useRouter } from 'next/router'

import { useOrderDetail } from '../../data/useOrderDetail'
import { extractErrorMessage } from '../../utils/helper'

import { StyledNoticeContainer } from '../../styles/pages/checkout.style'
import { CheckoutContainer } from '../../components/CheckoutContainer'
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler'
import { StyledPageContainer } from '../../styles/elements/container'
import { useEffect, useState } from 'react'
import AppSEO from '@/components/App/SEO'

const CheckoutDetail = (): JSX.Element => {
	const router = useRouter()
	const { data, error, loading } = useOrderDetail(router.query.id)
	const [orderData, setOrderData] = useState(undefined)

	useEffect(() => {
		if (!data) {
			return
		}

		if (data) {
			setOrderData(data)
		}

		if (data && router.query.success === 'true') {
			if (router.query?.status === 'completed')
				setOrderData({ ...data, status: 'CONFIRM' })
		}
	}, [data, router.query])

	if (loading) {
		return (
			<StyledPageContainer>
				<div>Loading...</div>
			</StyledPageContainer>
		)
	}

	if (error) {
		return (
			<StyledPageContainer>
				<h3>Error!</h3>
				<StyledNoticeContainer>
					<ErrorHandler message={extractErrorMessage(error)} />
				</StyledNoticeContainer>
			</StyledPageContainer>
		)
	}

	return (
		<>
			<AppSEO noIndex />
			{orderData && <CheckoutContainer orderData={orderData} />}
			<div />
		</>
	)
}

export default CheckoutDetail
