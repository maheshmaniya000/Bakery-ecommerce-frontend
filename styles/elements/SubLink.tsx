import styled from '@/types/styled'

export const SubLink = styled.div`
	position: relative;

	/* @media (max-width: 768px) {
		& > a {
			display: none;
		}
	} */

	@media (min-width: 768px) {
		&:hover {
			.content {
				display: block;
			}
		}
	}

	.content {
		display: none;
		position: absolute;
		width: 180px;
		padding: 2rem 0rem 0rem 2rem;
		z-index: 1;
		background-color: #e7d8c3;

		a {
			text-align: left;
			margin-bottom: 1.2rem;
		}

		@media (max-width: 768px) {
			/* display: block; */
			width: 100%;
			position: initial;
			padding: 0;

			a {
				font-size: 16px;
				text-align: center;
				margin-bottom: 18px;
				/* margin-bottom: 30px; */

				&:last-child {
					margin-bottom: 30px;
				}
			}
		}
	}
`
