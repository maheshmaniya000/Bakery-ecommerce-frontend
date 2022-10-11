import styled from '@/types/styled'

export const StyledSelectGroup = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 20px;
	margin-bottom: 20px;
	row-gap: 20px;

	.item {
		border: 1px solid #7c7167;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		padding: 21px 15px;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.linkColor};

		&.selected {
			background-color: #e7d8c3;
		}

		img {
			padding-right: 20px;
		}

		.service-heading {
			color: ${({ theme }) => theme.colors.linkColor};
			margin-bottom: 2px;
		}
	}
`
