import styled from '@/types/styled'
export const StyledBanner = styled.div`
	margin-bottom: 20px;
	position: relative;

	@media (min-width: 769px) {
		margin-bottom: 60px;
	}

	.slick-slide-container {
		width: 30%;
		max-width: 245px;
		background: linear-gradient(
			270deg,
			#ffffff 0%,
			rgba(255, 255, 255, 0) 100%
		);
		position: absolute;
		top: 0;
		bottom: 0;
		cursor: pointer;
		z-index: 5;

		&.prev {
			left: 0;
			transform: rotate(180deg);
		}

		&.next {
			right: 0;
		}
	}

	.slick-slide {
		& > div {
			outline: none;
			& > div {
				outline: none;
			}
		}
	}

	.slick-dots {
		position: absolute;
		bottom: 30px;

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
