import { AddToCart, BtnWrapper, Button } from './styled'

type Props = {
	selected: number
	maximum: number
	isDisabled: boolean
	onAddToCartClick: () => void
	onBuyNowClick: () => void
}

export function SliceBoxMobileButtons({
	isDisabled,
	selected,
	maximum,
	onAddToCartClick,
	onBuyNowClick,
}: Props) {
	return (
		<BtnWrapper>
			<AddToCart
				disabled={isDisabled}
				onClick={onAddToCartClick}
				type="button"
			>
				<p>
					{selected}/{maximum} slices
				</p>
				ADD TO CART
			</AddToCart>

			<Button disabled={isDisabled} onClick={onBuyNowClick} type="button">
				BUY NOW
			</Button>
		</BtnWrapper>
	)
}
