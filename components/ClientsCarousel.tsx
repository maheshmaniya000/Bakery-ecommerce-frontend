import Slider, { Settings, CustomArrowProps } from 'react-slick'
import { useRef, useState } from 'react'
import { StyledClientCarousel } from '@/styles/elements/client-carousel'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SlickArrow = (props: CustomArrowProps) => (
	<img
		{...props}
		className={`slick-slide-chevron`}
		aria-hidden="true"
		src="images/icons/right-chevron.svg"
	/>
)

interface Client {
	_id: string
	name: string
	testimonial: string
	image: string
}

interface Props {
	clients: Client[]
	onClick: (string) => void
}

const ClientCarousel = ({ clients, onClick }: Props) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const sliderSetting: Settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
		nextArrow: <SlickArrow />,
		prevArrow: null,
	}

	const sliderRef = useRef(null)

	return (
		<StyledClientCarousel ref={sliderRef}>
			<Slider {...sliderSetting}>
				{clients.map((client, index) => (
					<div
						className="item-wrapper"
						key={`item-${index}`}
						onClick={() => {
							setActiveIndex(index)
							onClick(client.testimonial)
						}}
					>
						<div className="item-indicator" />
						{activeIndex === index && (
							<div className="item-active-indicator" />
						)}

						<img
							src={client.image}
							style={{
								width: '100%',
								height: 'auto',
								padding: '20px 30px 0 30px',
							}}
						/>
						{/* <div
							className="item"
							style={{ backgroundImage: `url(${client.image})` }}
						>
						</div> */}
					</div>
				))}
			</Slider>
		</StyledClientCarousel>
	)
}

export default ClientCarousel
