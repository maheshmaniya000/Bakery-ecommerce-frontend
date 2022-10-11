import { useMediaQuery } from 'react-responsive'
import { SliceBoxDesktopButtons } from './SliceBoxDesktopButtons'
import { SliceBoxMobileButtons } from './SliceBoxMobileButtons'

type Props = {
	selected: number
	maximum: number
	isDisabled: boolean
	onAddToCartClick: () => void
	onBuyNowClick: () => void
}

export function SliceBoxButtons({
	isDisabled,
	selected,
	maximum,
	onAddToCartClick,
	onBuyNowClick,
}: Props) {
	const isDesktop = useMediaQuery({ minWidth: 769 })

	return isDesktop ? (
		<SliceBoxDesktopButtons
			selected={selected}
			maximum={maximum}
			isDisabled={isDisabled}
			onAddToCartClick={onAddToCartClick}
			onBuyNowClick={onBuyNowClick}
		/>
	) : (
		<SliceBoxMobileButtons
			selected={selected}
			maximum={maximum}
			isDisabled={isDisabled}
			onAddToCartClick={onAddToCartClick}
			onBuyNowClick={onBuyNowClick}
		/>
	)
}
