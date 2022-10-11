import styled from '@/types/styled'

export const StyledOrderSummary = styled.section`
	.heading {
		font-size: 1.6rem;
		line-height: 2.4rem;
		font-weight: bold;
		margin-bottom: 20px;

		&.narrow-margin {
			margin-bottom: 10px;
		}
	}

	.delivery-date {
		margin-bottom: 30px;
	}

	.main-heading {
		margin-top: 30px;
		margin-bottom: 10px;
	}

	.heading,
	.sub-heading {
		color: ${({ theme }) => theme.colors.linkColor};
	}

	.sub-heading {
		font-size: 1.6rem;
		line-height: 2rem;
	}

	.two-col-grid {
		margin-top: 50px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 20px;
		margin-bottom: 50px;
	}

	.summary-list {
		list-style: none;
		padding-left: 0;
		margin-top: 10px;

		li {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;
		}
	}

	.grand-total {
		font-size: 1.6rem;
		line-height: 2.2rem;
	}
`
