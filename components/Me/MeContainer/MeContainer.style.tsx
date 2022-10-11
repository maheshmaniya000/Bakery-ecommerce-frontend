import styled from '../../../types/styled'
import {
	StyledPageContainer,
	StyledSummaryContainer,
} from '../../../styles/elements/container'

export const StyledMeContainer = styled(StyledPageContainer)`
	display: grid;
	row-gap: 20px;
	grid-template-columns: minmax(0, 1fr);

	@media (min-width: 769px) {
		grid-template-columns: 1fr minmax(0, 300px);
		column-gap: 80px;
	}

	.title {
		font-size: 1.8rem;
		margin-bottom: 20px;
		color: ${({ theme }) => theme.colors.linkColor};
		margin-top: 0;
	}

	.page-title {
		color: ${({ theme }) => theme.colors.linkColor};
		font-size: 1.6rem;
		line-height: 3.1rem;
	}

	.account-navigation {
		margin-bottom: auto;
	}
`

export const StyledMeNavigation = styled(StyledSummaryContainer)`
	list-style: none;
	padding-bottom: 20px;
	font-size: 1.6rem;
	line-height: 2rem;

	@media (max-width: 768px) {
		margin-top: 0;
		grid-row: 1 / span 1;
	}

	li:not(:last-child) {
		margin-bottom: 20px;
	}
`

export const Logout = styled.div`
	margin-left: auto;
	font-weight: bold;
	font-size: 1.6rem;
	line-height: 1.7rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
	cursor: pointer;
`

export const UserName = styled.div`
	display: flex;
	align-items: center;
`

export const Title = styled.div`
	color: #7e5000;
	font-size: 1.6rem;
	font-weight: bold;
`
