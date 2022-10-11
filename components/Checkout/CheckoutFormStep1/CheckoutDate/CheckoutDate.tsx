import Slider, { CustomArrowProps } from 'react-slick'
import { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import {
	StyledDateCarousel,
	StyledDateContainer,
	StyledDateItem,
} from './CheckoutDate.style'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { ApplicationContext } from 'context/ApplicationContext'
import { useDeliverableDates } from 'data/useDeliverableDates'
import { getFlatCart } from 'lib/getFlatCart'

const RightSlickArrow = ({ ...props }: CustomArrowProps) => (
	<img
		{...props}
		className={`slick-slide-chevron right`}
		aria-hidden="true"
		src="/images/icons/right-chevron.svg"
	/>
)
const LeftSlickArrow = ({ ...props }: CustomArrowProps) => (
	<img
		{...props}
		className={`slick-slide-chevron left`}
		aria-hidden="true"
		src="/images/icons/left-chevron.svg"
	/>
)

interface Props {
	selectDate: (date) => void
}

export const CheckoutDate: React.FC<Props> = ({ selectDate }) => {
	const [selectedDate, setSelectedDate] = useState(null)

	const { cart, toggleValidDeliveryDate } =
		useContext<any>(ApplicationContext)

	const { data: dates } = useDeliverableDates({
		key: 'add-to-cart',
		cart: getFlatCart(cart),
		bundles: cart
			.filter((item) => item.type === 'bundle')
			.map((item) => ({
				bundle: item.bundle._id,
				quantity: item.quantity,
			})),
	})

	useEffect(() => {
		if (dates.length > 0) {
			toggleValidDeliveryDate(dates.some((x) => x.valid) || false)
		}
	}, [dates])

	function handleSelectDate(val) {
		if (!val.valid) {
			return
		}

		selectDate(val)
		setSelectedDate(val)
	}

	const sliderSetting = {
		infinite: false,
		speed: 500,
		variableWidth: true,
		nextArrow: <RightSlickArrow />,
		prevArrow: <LeftSlickArrow />,
		slidesToScroll: 4,
	}

	const sliderRef = useRef(null)

	useEffect(() => {
		const index = dates.findIndex((date) => date.valid)

		if (index > -1 && !selectedDate && sliderRef.current?.slickGoTo) {
			sliderRef.current.slickGoTo(index)
		}
	}, [dates, sliderRef.current?.slickGoTo, selectedDate])

	// const firstDeliverableDate = summary.deliverableDates.find(
	// 	(date) => date.valid
	// )

	// useEffect(() => {
	// 	if (!selectedDate && firstDeliverableDate) {
	// 		selectDate(firstDeliverableDate)
	// 		setSelectedDate(firstDeliverableDate)
	// 	}
	// }, [selectedDate, firstDeliverableDate])

	return (
		<StyledDateContainer>
			Date
			<StyledDateCarousel>
				<Slider
					ref={(slider) => (sliderRef.current = slider)}
					{...sliderSetting}
				>
					{dates.map((date, key) => (
						<StyledDateItem
							key={`date-${key}`}
							onClick={() => handleSelectDate(date)}
							isSelected={date.date === selectedDate?.date}
							isDisabled={!date.valid}
						>
							{moment(date.date).format('ddd ')} <br />
							{moment(date.date).format('DD MMM')}
						</StyledDateItem>
					))}
				</Slider>
			</StyledDateCarousel>
		</StyledDateContainer>
	)
}
