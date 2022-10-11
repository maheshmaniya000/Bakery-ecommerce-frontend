import styled from '@/types/styled'

export const Container = styled.div``

export const MainImage = styled.img`
	width: 100%;
	height: auto;
`

export const SliderContainer = styled.div`
	width: 83%;
	height: 70px;
	margin: 30px auto 0;

	.slick-slide div {
		outline: none !important;
	}

	.slick-prev,
	.slick-next {
		&:before {
			content: '';
			display: block;
			background-size: contain;
			background-repeat: no-repeat;
			width: 10px;
			height: 20px;
		}
	}

	.slick-prev {
		&:before {
			background-image: url(/images/left-arrow.svg);
		}
	}

	.slick-next {
		&:before {
			margin-left: auto;
			background-image: url(/images/right-arrow.svg);
		}
	}
`

export const ImageList = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 70px);
	gap: 12px;
`

export const ThumbnailContainer = styled.div`
	width: 70px;
	height: 70px;
	position: relative;
`

export const ThumbnailImage = styled.img`
	display: block;
	margin: 0 auto;
	width: 70px;
	height: 70px;
	object-fit: cover;
	opacity: ${({ active }: any) => (active ? '1' : '0.6')};
`
