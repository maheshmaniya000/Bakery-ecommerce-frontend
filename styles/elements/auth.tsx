import styled from '@/types/styled'

export const StyledAuth = styled.section(
	({ theme }) => `
		.heading {
			font-size: 1.6rem;
			line-height: 2.4rem;
			text-align: center;
			margin-bottom: 30px;
			color: ${theme.colors.linkColor}
		}
	`
)
