import { StyledSummaryContainer } from '@/styles/elements/container'
import { StyledButton } from '@/styles/elements'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ApplicationContext } from 'context/ApplicationContext'

interface Props {
	orderData: any
}

export const RequestForRegister: React.FC<Props> = ({ orderData }) => {
	const { setRedirectLinkAfterRegister, setOrderPayload } = useContext(
		ApplicationContext
	)
	const router = useRouter()

	return (
		<StyledSummaryContainer>
			<h3>Register with us</h3>

			<p style={{ marginBottom: '30px' }}>
				and you can track your orders, do a quick check out for your
				next purchase and many more...
			</p>

			<StyledButton
				onClick={() => {
					setRedirectLinkAfterRegister(
						`${router.asPath}?success=true`
					)

					setOrderPayload(orderData)
					router.push('/?action=register&from=order')
				}}
			>
				Register
			</StyledButton>
		</StyledSummaryContainer>
	)
}
