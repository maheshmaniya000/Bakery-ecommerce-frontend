import styled from '@/types/styled'

export const StyledOTP = styled.section(
	({ theme }) => `
		.container {
			display: flex;
			justify-content: space-evenly;
		}
		
		.item {
			width: 44px !important;
			height: 44px;
			background: #FFF;
			border: 1px solid ${theme.colors.borderColor};
			border-radius: 4px;
		}
	`
)
