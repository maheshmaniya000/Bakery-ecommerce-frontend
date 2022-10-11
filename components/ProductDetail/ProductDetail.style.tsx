import styled from '@/types/styled'
import { StyledButton } from '@/styles/elements'
import { Formik } from 'formik'

export const StyledProductDetailContainer = styled.section`
	margin-top: 30px;
	margin-bottom: 50px;

	@media (min-width: 992px) {
		margin-top: 50px;
		margin-bottom: 100px;
	}

	.content {
		margin-top: 19px;

		@media (min-width: 992px) {
			display: grid;
			column-gap: 42px;
			row-gap: 10px;
			grid-template-columns: 550px 1fr;
		}
	}
`

export const StyledProductImage = styled.section`
	img {
		width: 100%;
		height: auto;
	}
`

export const StyledProductImageList = styled.ul``

export const StyledThumbnailContainer = styled.div`
	width: 70px;
	height: 70px;
	position: relative;
`

export const StyledThumbnailInactive = styled.div`
	content: ' ';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(255, 255, 255, 0.3);
`

export const StyledProductImageThumbnail = styled.img`
	display: block;
	margin: 0 auto;
	width: 70px;
	height: 70px;
	object-fit: cover;
`

export const StyledImagesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 70px);
	gap: 12px;
`

export const StyledSliderContainer = styled.div`
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
		/* @media (max-width: 768px) {
			left: -120px;
		} */
		&:before {
			background-image: url(/images/left-arrow.svg);
		}
	}
	.slick-next {
		/* right: 0; */
		&:before {
			margin-left: auto;
			background-image: url(/images/right-arrow.svg);
		}
	}
`

export const StyledProductInfo = styled.section`
	h3 {
		padding: 15px 0;
	}

	.price {
		padding-bottom: 20px;
		color: ${({ theme }) => theme.colors.linkColor};
		font-size: 1.6rem;
		font-weight: bold;
		line-height: 1;
	}
`

export const StyledDetailBtnGroup = styled.div`
	display: grid;
	row-gap: 15px;

	@media (min-width: 769px) {
		grid-template-columns: repeat(2, 1fr);
		column-gap: 15px;
	}
`
export const StyledSubmit = styled(StyledButton)`
	width: 100%;
`

export const StyledForm = styled(Formik)`
	max-width: 340px;
	padding: 30px 0 47px 0;
`

export const StyledFormGroup = styled.div`
	margin-top: 6px;

	display: grid;
	column-gap: 20px;
	grid-template-columns: repeat(2, 1fr);
`

export const StyledDescription = styled.section`
	margin-top: 47px;

	h4 {
		padding-bottom: 15px;
		color: ${({ theme }) => theme.colors.linkColor};
		font-size: 1.6rem;
		font-weight: lighter;
		line-height: 1;
	}

	p {
		font-size: 1.5rem;
		line-height: 1.6rem;
		color: ${({ theme }) => theme.colors.linkColor};
		margin-bottom: 10px;
	}
`

export const StyledShortLabel = styled.label`
	display: flex;
	align-items: center;
	padding: 20px 0;

	img {
		margin-right: 10px;
	}

	input {
		margin-left: 10px;
	}
`
