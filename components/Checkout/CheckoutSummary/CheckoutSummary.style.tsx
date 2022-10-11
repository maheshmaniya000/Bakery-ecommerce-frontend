import styled from '@/types/styled'
import { StyledSummaryContainer } from '@/styles/elements/container'

export const StyledCheckoutSummary = styled(StyledSummaryContainer)(
	({ theme }) => `
	
	.price-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;	
	}
	
	.border-top {
		border-top: 1px solid ${theme.colors.baseFontColor};
		padding-top: 20px;
	}
	
	.cart-link {
		margin-top: 15px;	
	}

`
)
