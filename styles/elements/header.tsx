import styled from '@/types/styled'
import { Anchor } from '@/styles/elements/anchor'
import { unselectableStyle } from '@/styles/helpers/unselectable'

type NavLinkProps = {
	active?: boolean
}

interface StyledHeaderProps {
	isBanner: boolean
}

export const StyledHeader = styled.header<StyledHeaderProps>(
	({ theme, isBanner }) => `
		background-color: ${theme.colors.primary};
		padding: 0 15px;

		@media (max-width: 768px) {
			z-index: 10000;
			position: fixed;
			top: ${isBanner ? '30px' : 0};
			right: 0;
			left: 0;
		}
		
		.logo {
			padding-right: 50px;
		}
		
		.nav {
			display: flex;
			align-items: center;
			max-width: 1140px;
			margin: 0 auto;
			padding: 15px 0;
		}
		
		.nav-link-wrapper {
			margin-top: 4px;
		}
`
)

export const StyledNav = styled.nav<NavLinkProps>(
	({ theme, active }) => `
	margin-top: 4px;
	
	@media (min-width: 769px) {
		width: 100%;
	}
	
	.nav-wrapper {	
		display: flex;
		align-items: center;
		
		@media (min-width: 769px) {
			justify-content: space-between;	
		}
		
		@media (max-width: 768px) {
			display: ${active ? 'flex' : 'none'};	
			
			flex-direction: column;
			text-align: center;
			position: fixed;
			top: 80px;
			bottom: 0;
			left: 0;
			right: 0;
			padding-top: 80px;
			
			background: ${theme.colors.primary};
			z-index: 100;
		}
	}
	
	.main-navigation {
		display: flex;
		
		@media (max-width: 768px) {
			flex-direction: column;	
		}
	}
	
	.nav-right-menu {
		padding-left: 16px;
		display: flex;
		align-items: center;
		@media (min-width: 769px) {
			margin-left: auto;					
		}
		@media (max-width: 768px) {
			width: 90%;
			margin: 0 auto;
			justify-content: center;
		}

		li {
			cursor: pointer;
			position: relative;
			&:not(:last-child) {
				margin-right: 50px;	

				@media (max-width: 768px) {
					margin-right: 12px;
				}
			}			
		}		
	}
`
)

export const StyledNavAnchor = styled(Anchor)<NavLinkProps>`
	font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
	text-transform: uppercase;
	font-size: 1.3rem;
	color: ${({ theme }) => theme.colors.linkColor};
	text-align: center;

	@media (min-width: 769px) {
		margin-right: 30px;
	}

	@media (max-width: 768px) {
		margin-bottom: 30px;
		font-size: 2rem;
	}

	&:last-child {
		margin-right: 0;
	}
`

export const StyledNavToggle = styled.div<NavLinkProps>(
	({ active }) => `
	width: 28px;
	cursor: pointer;
	margin-left: 24px;
	${unselectableStyle}
	
	@media (min-width: 789px) {
		display: none;	
		align-self: flex-end;
	}

	.bottom,
	.middle,	
	.top {
		position: relative;
		display:block;
		width: inherit;
		height: 3px;
		margin-bottom: 5px;
		
		&:before,
		&:after {
			content: '';
			position: absolute;	
			background: #888;
			width: 50%;
			backface-visibility: hidden;
			height: inherit;
			transition: transform ease-out 0.2s;
		}	
		
		&:before {
			left: 0;
		}
		
		&:after {
			right: 0;
		}
	}	
	
	.bottom {
		margin-bottom: 0;
		&:before {
			transform: ${active ? 'translate(3px, -4px) rotate(-45deg)' : 'none'}; 	
		}	
		
		&:after{
			transform: ${active ? 'translate(-3px, -4px) rotate(45deg)' : 'none'}; 	
		}	
	}
	
	.top {
		&:before {
			transform: ${active ? 'translate(3px, 4px) rotate(45deg)' : 'none'}; 	
		}	
		
		&:after{
			transform: ${active ? 'translate(-3px, 4px) rotate(-45deg)' : 'none'}; 	
		}
	}
	
	.middle {
		&:before {
			transform: ${active ? 'scaleX(0)' : 'none'}; 	
			transform-origin: right;
		}	
		
		&:after {
			transform: ${active ? 'scaleX(0)' : 'none'}; 	
			transform-origin: left;
		}
	}
`
)

export const StyledHeaderSearch = styled.section`
	background: ${({ theme }) => theme.colors.baseFontColor};
	padding: 14px 20px;
	width: 360px;

	@media (max-width: 768px) {
		width: 80vw;
	}
`
