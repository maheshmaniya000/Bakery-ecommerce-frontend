import styled, { Theme } from '@/types/styled'
import { clickEfxStyles } from '@/styles/helpers/click-efx'

interface Props {
	mode?: string
	theme: Theme
}

export const StyledButton = styled.button(
	({ mode, theme }: Props) => `
	
		${clickEfxStyles}
		
		background: ${
			mode === 'pale'
				? theme.colors.baseFontColor
				: theme.colors.linkColor
		};
		
		border-radius: 4px;
		padding: 14px 16px;
		min-width: 146px;
		max-width: 100%;
		font-size: 1.2rem;
		line-height: 1.2;
		
		border: 0;
		color: ${theme.colors.borderColor};
		text-transform: uppercase;
		outline: none;

		display: flex;
		align-items: center;
		justify-content: center;
		
		&:disabled {
			background: ${theme.colors.borderColor};
			color: ${theme.colors.baseFontColor};
			cursor: not-allowed;
		}
`
)
