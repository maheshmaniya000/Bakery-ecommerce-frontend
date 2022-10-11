import styled from '@/types/styled'

export const StyledDeliveryInfo = styled.div(
	({ theme }) => `
	h3 {
		font-size: 1.7rem;
		line-height: 2.4rem;
		color: ${theme.colors.linkColor};
	}
	
	
	.label {
		color: ${theme.colors.linkColor};
		font-weight: bold;
		padding-bottom: 10px;
		font-size: 1.5rem;
	}	
	
	.content {
		padding-top: 20px;	
		font-size: 1.5rem;
		color: ${theme.colors.baseFontColor}
	}
	
	.info {
		line-height: 150%;	
	}
`
)
