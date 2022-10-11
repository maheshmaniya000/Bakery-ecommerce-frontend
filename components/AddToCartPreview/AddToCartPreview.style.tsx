import styled from '@/types/styled'

export const StyledAddToCartPreview = styled.div(
	({ theme }) => `
		background: ${theme.colors.secondary};
		padding: 50px;
		width: 500px;
		border-radius: 4px;
		border: 1px solid ${theme.colors.baseFontColor};
		position: relative;

		@media (max-width: 768px) {
			width: 90vw;
		}
		
		.close {
			position: absolute;
			right: 21px;
			top: 21px;
		}
		
		.heading {
			text-align: center;
			color: ${theme.colors.linkColor};
			font-weight: bold;
			font-size: 2.2rem;
			line-height: 2.4rem;
			
			
			img {
				margin-right: 15px;	
				vertical-align: middle;
			}
		}
	
		.content {
			margin: 30px 0;
			display: grid;
			grid-template-columns: 120px 1fr;
			column-gap: 20px;
			align-items: center;
		}
			
		.thumbnail {
			width: 100%;
			height: 120px;		
		}
		
		.info {
			text-align: left;
			.product-heading {
				color: ${theme.colors.linkColor};
				font-size: 1.8rem;
				line-height: 2rem;	
				margin-bottom: 10px;
			}	
			.variant {
				margin-bottom: 10px;
			}
			.price {
			}
		}
	
		.btn-wrap {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 24px;
		}	
		
	`
)
