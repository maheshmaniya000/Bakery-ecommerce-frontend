import styled from '@/types/styled'

export const StyledClientCarousel = styled.section(
	({ theme }) => `
	position: relative;
	padding: 0 20px 45px;
	overflow: visible;
	
	.slick-slide-chevron {
		position: absolute;
		right: -40px;
		top: calc(50% - 15px);
		
		@media (max-width: 768px) {
			display: none !important;	
		}
	}
	
	// &:before {
	// 	width: 100%;
	// 	position: absolute;	
	// 	height: 1px;
	// 	top: 2px;
	// 	left: 0;
	// 	content: '';
	// 	top: 0;
	// 	background: ${theme.colors.borderColor};
	// }

	.item-wrapper {
		outline: none;
		padding-top: 2px;
	}

	.item-indicator {
		height: 2px;
		width: 100%;
		background-color: #E7D8C3;
	}

	.item-active-indicator {
		margin-top: -3px;
		height: 4px;
		width: calc(100% - 15px);
		background-color: #785118;
	}
	
	.item {
		margin-top: 43px;
		background: #00000000 no-repeat center; // just dummy background, so we will not use color from theme
		background-size: cover;
		height: 115px;		
		outline: none;
		margin-right: 15px;
	}
`
)
