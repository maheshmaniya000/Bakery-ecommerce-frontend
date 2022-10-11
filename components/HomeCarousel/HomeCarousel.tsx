import { motion } from 'framer-motion'
import Slider, { Settings } from 'react-slick'

import { Container } from './HomeCarousel.styles'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getCDNImage } from 'lib/getCDNImage'

interface Props {
	images: string[]
}

export const HomeCarousel = ({ images }: Props) => {
	const settings: Settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	}

	return (
		<section>
			<Container>
				<Slider {...settings}>
					{images.map((image) => (
						<div style={{ outline: 'none' }} key={image}>
							<motion.img
								src={getCDNImage(image)}
								alt="Online Bakehouse"
								width={'100%'}
								initial={{ opacity: 0.6, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6 }}
							/>
						</div>
					))}
				</Slider>
			</Container>
		</section>
	)
}
