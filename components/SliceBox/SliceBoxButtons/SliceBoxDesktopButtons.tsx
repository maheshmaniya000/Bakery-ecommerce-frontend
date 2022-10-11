import { StyledPageHeading } from '@/styles/elements/typography'
import { Button, DesktopBtnsWrapper } from './styled'

type Props = {
	selected: number
	maximum: number
	isDisabled: boolean
	onAddToCartClick: () => void
	onBuyNowClick: () => void
}

export function SliceBoxDesktopButtons({
	isDisabled,
	selected,
	maximum,
	onAddToCartClick,
	onBuyNowClick,
}: Props) {
	return (
		<div>
			<StyledPageHeading size="1.6rem" className="heading">
				Step 3: Confirm selection: {selected}/{maximum} slices
			</StyledPageHeading>

			<DesktopBtnsWrapper>
				<Button
					disabled={isDisabled}
					onClick={onAddToCartClick}
					type="button"
				>
					Add TO CART
				</Button>

				<Button
					disabled={isDisabled}
					onClick={onBuyNowClick}
					type="button"
				>
					BUY NOW
				</Button>
			</DesktopBtnsWrapper>
		</div>
	)
}
