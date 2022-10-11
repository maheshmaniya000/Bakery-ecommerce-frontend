import styled from '@/types/styled'
import { clickEfxStyles } from '@/styles/helpers/click-efx'

export const StyledCartItem = styled.section(
	({ theme }) => `
	margin-bottom: 50px;	
	
	display: grid;
	column-gap: 20px;
	row-gap: 33px;
	margin-top: 14px;
	grid-template-columns: 120px minmax(0,1fr) 150px 90px;

	@media (max-width: 768px) {
		row-gap: 24px;
	}

	.product-info {
	position: relative;	
	}
	
	.cart-variant-wrapper {
		position: absolute;
		width: 150px;
		right: 0;
		top: 0;

		@media (max-width: 425px) {
			position: initial;
			width: 100%;
		}
	}

	.price,
	.product-name {
		font-weight: bold;
		color: ${theme.colors.linkColor};
	}

	.product-info {
		@media(max-width: 768px) {
			grid-column: 2 / span 3;
		}
	}

	.thumbnail {
		display: block;
		@media(max-width: 768px) {
			grid-row: 1 / span 2;
		}
	}

	.quantity-input {
		@media(max-width: 768px) {
			grid-column: 2 / span 2;
		}
	}
	
	.product-name {
		font-size: 1.6rem;
		line-height: 2.2rem;
		max-width: 150px;

		@media (max-width: 425px) {
			max-width: 100%;
			margin-bottom: 10px;
		}
	}

	.remove-link {
		margin-top: 20px;	
	}	
	
	.thumbnail {
		width: 100%;
		height: 120px;	
	}
	
	.price {
		text-align: right;	
		padding-top: 10px;

		@media(max-width: 768px) {
			text-align: left;
			grid-row: 3 / span 1;
			grid-column: 2 / span 1;
		}
	}
	
	.special-product-info {
		padding-top: 20px;
		list-style: none;
		margin-left: 0;

		
		li {
			font-size: 1.5rem;
			line-height: 2rem;
			&:not(:last-child) {
				margin-bottom: 5px;	
			}
		}
	}
`
)

export const StyledEditImage = styled.img`
	${clickEfxStyles}

	cursor: pointer;
`
