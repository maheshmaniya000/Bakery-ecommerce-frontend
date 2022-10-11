import styled from '@/types/styled'

export const StyledCheckoutContainer = styled.div(
	({ theme }) => `
	@media (min-width: 992px) {
		display: grid;
		width: 100%;
		grid-template-columns: minmax(0, 1fr) 340px;
		column-gap: 100px;
		margin-top: 14px;
		grid-auto-rows: auto;
	}
	
	.page-heading {
		font-size: 1.6rem;
		line-height: 2.4rem;
		color: ${theme.colors.linkColor};
		font-weight: bold;
		margin-top: 50px;
		margin-bottom: 20px;
	}
	
	.card-container {
		margin-top: 10px;	
		color: ${theme.colors.linkColor};
		align-items: center;
		display: flex;
		
		.brand-icon {
			margin-right: 5px;	
		}	
	}
`
)

export const StyledNoticeContainer = styled.section(`
	margin-top: 10px;
`)

export const StyledLoginForm = styled(StyledNoticeContainer)(
	({ theme }) => `
	margin-top: 10px;
	border: 1px solid ${theme.colors.baseFontColor};
	background: ${theme.colors.secondary};
	padding: 16px 20px;
	
	a {
		color: ${theme.colors.linkColor};	
	}
`
)
