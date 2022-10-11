import styled from '../../../../types/styled'
import { clickEfxStyles } from '../../../../styles/helpers/click-efx'

export const StyledDateContainer = styled.section`
	width: 100%;
`

export const StyledDateCarousel = styled.section`
	position: relative;
	padding: 10px 20px 0 0;

	.slick-slide-chevron {
		position: absolute;
		top: calc(50% - 15px);
		cursor: pointer;

		@media (max-width: 768px) {
			display: none !important;
		}

		&.left {
			left: -40px;
		}

		&.right {
			right: -40px;
		}
	}

	.date-item {
		border: 1px solid ${({ theme }) => theme.colors.baseFontColor};
		color: ;
	}
`

interface DateItemProps {
	isDisabled?: boolean
	isSelected?: boolean
}

export const StyledDateItem = styled.div<DateItemProps>(
	({ theme, isDisabled, isSelected }) => `
	${clickEfxStyles}
	
	width: 70px !important;
	display: flex !important;
	height: 70px;
	padding: 8px;
	align-items: center;
	justify-content: center;
	
	font-size: 1.5rem;
	line-height: 1.7rem;
	margin-right: 5px;
	text-align: center;
	font-weight: bold;
	outline: none;
	
	cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

	border: 1px solid ${
		isDisabled ? theme.colors.borderColor : theme.colors.baseFontColor
	};
	color: ${isDisabled ? theme.colors.borderColor : theme.colors.linkColor};
	${
		isSelected &&
		`
			background: ${theme.colors.borderColor};
		`
	}	
`
)
