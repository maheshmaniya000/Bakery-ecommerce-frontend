import styled from '@/types/styled'
import { baseContainerStyle } from '@/styles/helpers/base-container'

export const StyledBaseContainer = styled.div(
	({ theme }) => `
	${baseContainerStyle(theme)}
`
)

export const StyledPageContainer = styled(StyledBaseContainer)`
	margin-top: 30px;
	margin-bottom: 50px;
	@media (min-width: 992px) {
		margin-top: 50px;
		margin-bottom: 100px;
	}
`

export const StyledSummaryContainer = styled.section(
	({ theme }) => `
	border: 1px solid ${theme.colors.baseFontColor};
	background: ${theme.colors.secondary};
	color: ${theme.colors.linkColor};
	
	padding: 20px 20px 50px;
	margin-top: 20px;
	
	h3 {
		font-size: 1.6rem;
		line-height: 2.4rem;
		margin-bottom: 20px;
	}
	
	button {
		width: 100%;	
	}
`
)
