import { getCDNImage } from 'lib/getCDNImage'
import { useState } from 'react'
import Slider, { Settings } from 'react-slick'

import { Thumbnail } from './_Thumbnail'
import { Container, ImageList, MainImage, SliderContainer } from './_styled'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type Props = {
	images: string[]
	alt: string
	initialCurrent?: number
}

const settings: Settings = {
	dots: false,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 3,
	autoplay: false,
	arrows: true,
}

export const ProductImage = ({ images, alt, initialCurrent = 0 }: Props) => {
	const [current, setCurrent] = useState(initialCurrent)

	return (
		<Container>
			<MainImage src={getCDNImage(images[current])} alt={alt} />
			<SliderContainer>
				{images.length >= 5 ? (
					<Slider {...settings}>
						{images.map((image, index) => (
							<Thumbnail
								key={image}
								image={image}
								isActive={current === index}
								onClick={() => setCurrent(index)}
							/>
						))}
					</Slider>
				) : (
					<ImageList>
						{images.map((image, index) => (
							<Thumbnail
								key={image}
								image={image}
								isActive={current === index}
								onClick={() => setCurrent(index)}
							/>
						))}
					</ImageList>
				)}
			</SliderContainer>
		</Container>
	)
}
