import Slider from 'react-slick'
import { useRef } from 'react'
import { StyledBanner, StyledImage } from '@/styles/elements'

interface SliderArrowProps {
	isPrev?: boolean
}

const SlickArrow = ({ isPrev, ...props }: SliderArrowProps) => (
	<div
		{...props}
		className={`slick-slide-container ${isPrev ? 'prev' : 'next'}`}
		aria-hidden="true"
	/>
)

const HomeBanner = () => {
	const sliderSetting = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SlickArrow />,
		prevArrow: <SlickArrow isPrev={true} />,
	}

	const sliderRef = useRef(null)

	return (
		<StyledBanner ref={sliderRef}>
			<Slider {...sliderSetting}>
				<div key={1}>
					<StyledImage
						src="/images/banner-img.png"
						alt="Online Bakehouse"
					/>
				</div>
				<div key={2}>
					<StyledImage
						src="/images/banner-img.png"
						alt="Online Bakehouse"
					/>
				</div>
			</Slider>
		</StyledBanner>
	)
}

export default HomeBanner
