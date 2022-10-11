import styled from '@/types/styled'

export const Container = styled.div`
	margin: 0 auto 40px;
	max-width: 1140px;
	position: relative;

	@media (min-width: 769px) {
		margin-bottom: 60px;
	}

	.slick-slide {
		& > div {
			outline: none;
			margin-top: 30px;

			@media (max-width: 425px) {
				margin-top: 20px;
			}

			& > div {
				outline: none;
				height: auto;

				/* @media (max-width: 425px) {
					img {
						height: 220px;
					}
				} */
			}
		}
	}

	.slick-dots {
		position: absolute;
		bottom: 30px;

		@media (max-width: 768px) {
			bottom: 8px;
		}

		li.slick-active button {
			background: ${({ theme }) => theme.colors.linkColor};
		}

		button {
			border: 1px solid #fff;
			background: rgba(126, 80, 0, 0.3);
			border-radius: 50%;
			&:before {
				display: none;
			}

			@media (max-width: 768px) {
				width: 12px;
				height: 12px;
			}
		}
	}
`

export const LeftBlurContianer = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	z-index: 1;
	width: 30%;
	max-width: 245px;
	background: linear-gradient(
		810deg,
		#ffffff 0%,
		rgba(255, 255, 255, 0) 100%
	);
`

export const RightBlurContainer = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	z-index: 1;
	width: 30%;
	max-width: 245px;
	background: linear-gradient(
		270deg,
		#ffffff 0%,
		rgba(255, 255, 255, 0) 100%
	);
`
