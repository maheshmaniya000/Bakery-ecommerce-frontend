import { useRouter } from 'next/router'

import { useOrderDetail } from '../../../data/useOrderDetail'
import { extractErrorMessage } from '../../../utils/helper'

import { StyledNoticeContainer } from '../../../styles/pages/checkout.style'
import { CheckoutContainer } from '../../../components/CheckoutContainer'
import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler'
import { StyledPageContainer } from '../../../styles/elements/container'

const CheckoutDetail = (): JSX.Element => {
	const router = useRouter()

	const { data, error, loading } = useOrderDetail(router.query.id)

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

	return <CheckoutContainer orderData={data} />
}

export default CheckoutDetail
