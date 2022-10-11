import styled from '@/types/styled'

export const StyledTabList = styled.ul`
	list-style: none;
	padding-left: 0;
	// display: flex;
	// justify-content: space-evenly;

	display: grid;
	grid-template-columns: repeat(3, 1fr);

	li {
		display: inline-block;
		text-align: center;
		position: relative;
		cursor: pointer;

		&.active .badge {
			background: ${({ theme }) => theme.colors.linkColor};
		}
		
		&.disabled {
			cursor: not-allowed;
		}

		&:not(:last-child):before {
			background: ${({ theme }) => theme.colors.baseFontColor};
			position: absolute;
			height: 1px;
			width: 100%;
			top: 25px;
			content: '';
			z-index: -1;
		}
	}

	.badge {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.5rem;
		line-height: 1.7rem;
		border-radius: 50%;
		margin: 10px auto;

		color: #fff;
		background: ${({ theme }) => theme.colors.baseFontColor};
	}
`
