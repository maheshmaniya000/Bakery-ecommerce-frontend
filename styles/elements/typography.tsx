import styled from '@/types/styled'
interface HeadingProps {
	size?: string
}

export const StyledContentHeading = styled.h3<HeadingProps>(
	({ theme, size = '1.8rem' }) => `
		color: ${theme.colors.linkColor};
		font-size: ${size};
		font-weight: bold;
		letter-spacing: 0.05rem;
		text-transform: uppercase;
		text-align: center;
`
)

export const StyledPageHeading = styled.h3<HeadingProps>(
	({ theme, size = '2.2rem' }) => `
		color: ${theme.colors.linkColor};
		font-size: ${size};
		line-height: 3.1rem;
		font-weight: bold;
		margin-top: 20px;
`
)

export const StyledTextUppercase = styled.span`
	text-transform: uppercase;
`
