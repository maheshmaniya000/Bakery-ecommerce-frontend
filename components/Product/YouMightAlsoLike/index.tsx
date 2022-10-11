import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'

const imageSliderSettings = {
	dots: false,
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 3,
	autoplay: false,
	arrows: true,
}

const images = [
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
]

const CarouselContainer = styled.div`
	margin: 30px -20px 100px;

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

const ImageContainer = styled.div`
	padding: 0 20px;
`

const Image = styled.img`
	width: 100%;
	height: 262px;
	object-fit: cover;
`

const Title = styled.h2`
	font-weight: bold;
	font-size: 2.8rem;
	line-height: 3.1rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const TitleContainer = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
`

const TitleSeeAll = styled.a`
	font-size: 1.5rem;
	line-height: 1.6rem;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
`

const YouMightAlsoLike = () => {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					key="slick"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					key="slick-theme"
				/>
			</Head>
			<section>
				<TitleContainer>
					<Title>You might also like</Title>
					<Link href="/" passHref>
						<TitleSeeAll>See all</TitleSeeAll>
					</Link>
				</TitleContainer>
				<CarouselContainer>
					<Slider {...imageSliderSettings}>
						{images.map((image, index) => (
							<ImageContainer key={index}>
								<Image src={image} alt="product" />
							</ImageContainer>
						))}
					</Slider>
				</CarouselContainer>
			</section>
		</>
	)
}

export default YouMightAlsoLike
