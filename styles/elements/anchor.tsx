import styled from '@/types/styled'
import { clickEfxStyles } from '@/styles/helpers/click-efx'

interface AnchorProps {
	isUnderline?: boolean
	isActive?: boolean
}

export const Anchor = styled.a<AnchorProps>(
	({ theme, isUnderline, isActive }) => `
	${clickEfxStyles}
	cursor: pointer;
	display: block;
	text-decoration: none;
	color: #7E5000;
	font-weight: ${isActive ? 'bold' : 'normal'};
	${
		isUnderline &&
		`
		color: ${theme.colors.linkColor};
		text-decoration: underline;
		font-weight: bold;
	`
	}
`
)
