import styled from '@emotion/styled'
import { Product as ProductInterface } from 'interfaces/Product'
import Link from 'next/link'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Product from './Product'
import { ProductListCard } from './Products/ProductListCard/ProductListCard'

const CarouselContainer = styled.div`
	margin: 30px -20px;

	@media (max-width: 425px) {
		margin-top: 15px;
	}

	.slick-slide div {
		outline: none !important;
	}
	.slick-prev,
	.slick-next {
		top: 36%;
		&:before {
			content: ' ';
			display: block;
			background-size: contain;
			background-repeat: no-repeat;
			width: 10px;
			height: 20px;
		}
	}
	.slick-prev {
		z-index: 10;
		@media (max-width: 768px) {
			left: 36px;
		}
		&:before {
			background-image: url(/images/left-arrow.svg);
		}
	}
	.slick-next {
		@media (max-width: 768px) {
			right: 36px;
		}

		&:before {
			margin-left: auto;
			background-image: url(/images/right-arrow.svg);
		}
	}
`

const ImageContainer = styled.div`
	padding: 0 20px;
	/* height: 261px; */
`

const Title = styled.h2`
	font-weight: bold;
	font-size: 1.6rem;
	line-height: 1;
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

interface Props {
	title: string
	link?: string
	products: ProductInterface[]
}

const MoreItem = ({ title, link, products }: Props) => {
	const [width, setWidth] = useState(0)
	const sliderRef = useRef<Slider>()

	const imageSliderSettings = {
		dots: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 3,
		autoplay: false,
		arrows: true,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
		],
	}

	useEffect(() => {
		const width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth

		setWidth(width)
	}, [])

	function renderList(width, products) {
		if (width > 768 && products.length < 4) {
			return (
				<div
					style={{
						display: 'flex',
					}}
				>
					{products.map((product, index) => {
						return (
							<ImageContainer
								key={index}
								style={{
									height: 'fit-content',
								}}
							>
								{product.type === 'bundle' ? (
									<ProductListCard
										title={product.name}
										price={product.price}
										// eslint-disable-next-line
										// @ts-ignore
										image={product.image}
										url={`/bundles/${product.slug}`}
										key={product._id}
										index={index}
									/>
								) : (
									<Product
										productDetail={product}
										key={product._id}
										index={index}
									/>
								)}
							</ImageContainer>
						)
					})}
				</div>
			)
		}

		return (
			<Slider ref={sliderRef} {...imageSliderSettings}>
				{products.map((product, index) => {
					if (product.type === 'bundle') {
						return (
							<ProductListCard
								title={product.name}
								price={product.price}
								// eslint-disable-next-line
								// @ts-ignore
								image={product.image}
								url={`/bundles/${product.slug}`}
								key={product._id}
								index={index}
							/>
						)
					}

					return (
						<ImageContainer key={index}>
							<Product
								productDetail={product}
								key={product._id}
								index={index}
							/>
						</ImageContainer>
					)
				})}
			</Slider>
		)
	}

	return (
		<>
			<section>
				<TitleContainer>
					<Title>{title}</Title>
					{link && (
						<Link href={link} passHref>
							<TitleSeeAll>See all</TitleSeeAll>
						</Link>
					)}
				</TitleContainer>
				{products.length > 0 && (
					<CarouselContainer>
						{renderList(width, products)}
					</CarouselContainer>
				)}
			</section>
		</>
	)
}

export default MoreItem
