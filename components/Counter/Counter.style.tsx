import styled from '@/types/styled'

export const StyledCounter = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border: ${({ theme }) => `1px solid ${theme.colors.baseFontColor}`};
	border-radius: 4px;

	.value {
		flex: 1;

		background: #ffffff;
		border: 0;
		color: ${({ theme }) => `${theme.colors.linkColor}`};
		padding: 10px 0px;

		text-align: center;
	}

	.minus,
	.plus {
		width: 15px;
		height: 15px;
		border: 0;
		outline: none;
		background: none;
		cursor: pointer;
		color: ${({ theme }) => `${theme.colors.linkColor}`};
		margin: 0 18px;

		@media (max-width: 425px) {
			margin: 0 12px;
		}
	}
`
