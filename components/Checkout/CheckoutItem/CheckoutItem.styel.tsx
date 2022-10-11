import styled from '@/types/styled'

export const StyledCheckoutItem = styled.section(
	({ theme }) => `
	margin-bottom: 50px;	
	
	display: grid;
	column-gap: 20px;
	row-gap: 33px;
	margin-top: 14px;
	grid-template-columns: 60px 1fr 100px;
	
	.product-info {
		position: relative;	
		color: ${theme.colors.baseFontColor};
		font-size: 1.5rem;
		line-height: 1.7rem;
	}


	.variant-size,
	.product-name {
		padding-bottom: 5px;	
	}
	
	.price,
	.product-name {
		font-weight: bold;
		color: ${theme.colors.linkColor};
	}
	
	.remove-link {
		margin-top: 20px;	
	}	
	
	.thumbnail {
		width: 100%;
		height: 60px;	
	}
	
	.price {
		text-align: right;	
		padding-top: 10px;
	}
`
)

