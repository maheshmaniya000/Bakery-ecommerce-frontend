import styled from '@/types/styled'

export const StyledCartSummary = styled.section(
	({ theme }) => `
	border: 1px solid ${theme.colors.baseFontColor};
	background: ${theme.colors.secondary};
	color: ${theme.colors.linkColor};
	padding: 20px 20px;
	margin-bottom: auto;

	h3 {
		font-size: 1.6rem;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		margin-top: 12px;
	}
	
	.promo-code-name {
		margin-bottom: 10px;
		font-weight: bold;
		margin-top: 50px;
	}
	
	.button {
		width: 100%;	
		margin-top: 50px;
	}
	
	.price-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;	
	}
	
	.border-bottom {
		border-bottom: 1px solid ${theme.colors.baseFontColor};
		padding-bottom: 20px;
	}
`
)
