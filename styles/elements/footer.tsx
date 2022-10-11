import styled from '@/types/styled'
import { Anchor } from './anchor'

export const StyledFooter = styled.footer`
	position: relative;
	padding: 30px 0 50px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	@media (min-width: 901px) and (max-width: 1200px) {
		padding-right: 80px;
		padding-left: 80px;
	}

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	.logo {
		@media (max-width: 900px) {
			text-align: center;
			margin: 20px auto;
		}
		img {
			width: 98px;
		}
	}

	.nav-wrapper {
		margin: 0 auto;
		display: flex;
		@media (max-width: 900px) {
			max-width: 95%;
		}

		@media (max-width: 768px) {
			max-width: 100%;
		}
	}

	.nav {
		list-style: none;
		padding-left: 0;
		width: 50%;

		@media (max-width: 900px) {
			text-align: center;
			width: 100%;
			margin-bottom: 0;
		}
	}

	.nav-link {
		letter-spacing: 0.05em;
		margin-bottom: 15px;
		cursor: pointer;
		text-decoration: none;
		line-height: 1.2;

		a {
			display: inline-block;
			position: relative;
			transition: color ease 0.2s;
			&:before {
				content: '';
				width: 100%;
				height: 1px;
				background: ${({ theme }) => theme.colors.linkColor};
				position: absolute;
				bottom: 0;
				transform: scaleX(0);
				transform-origin: center left;
				transition: transform ease 0.2s;
			}

			&:hover {
				color: ${({ theme }) => theme.colors.linkColor};
				&:before {
					transform: scaleX(1);
				}
			}
		}
	}
`

export const StyledFooterInfoList = styled.div(
	({ theme }) => `

		&:not(:first-of-type) {
			margin-top: 16px;
		}
	
		@media (max-width: 900px) {
			text-align: center;
			margin-top: 25px;
		}
		
		.heading {
			font-size: 1.5rem;
			line-height: 1.1;	
			letter-spacing: 0.05rem;
			color: ${theme.colors.linkColor};
			margin-bottom: 15px;
			font-weight: normal;
			text-transform: uppercase;
		}

		display: flex;
    	justify-content: center;
    	margin-top: 8px;

	`
)

export const StyledCopyRight = styled.div(
	({ theme }) => `
	padding:  12px 0;
	border-top: 1px solid ${theme.colors.borderColor};
	
	@media (min-width: 901px) and (max-width: 1200px) {
		padding-right: 80px;
		padding-left: 80px;
	}
		
	@media (max-width: 900px) {
		text-align: center;
	}	
`
)

export const StyledCopyRightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 900px) {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 12px;
	}
`

export const SocialIcon = styled.img`
	width: 24px;
	height: 24px;
	margin-right: 12px;
`
export const PaymentIcon = styled.svg`
	margin-right: 12px;
`

export const StyledFooterAnchor1 = styled(Anchor)`
	display: inline;
	margin-right: 12px;
`

export const AnchorContainer = styled.div`
	margin-right: 6px;
	padding-right: 6px;
	display: flex;
	align-items: center;

	&::after {
		content: ' . ';
		padding-bottom: 5px;
		padding-left: 12px;
		&::last-of-type {
			content: '';
		}
	}
	&::last-of-type {
		&::after {
			content: '';
		}
	}
`

export const AnchorContainer2 = styled.div`
	margin-right: 6px;
	padding-right: 6px;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		margin-right: 0px;
	}
`
