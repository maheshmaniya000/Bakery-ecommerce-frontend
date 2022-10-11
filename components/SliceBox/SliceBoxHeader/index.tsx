import { StyledButton } from '@/styles/elements'
import { StyledPageHeading } from '@/styles/elements/typography'
import { BtnWrapper, Container } from './styled'

type Props = {
	remainingSlots: number
	isDisabled?: boolean
	onAddToCartClick: () => void
	onBuyNowClick: () => void
}

export const SliceBoxHeader = ({
	isDisabled = true,
	onAddToCartClick,
	onBuyNowClick,
}: Props) => {
	return (
		<Container>
			<StyledPageHeading
				size="1.6rem"
				className="heading"
				style={{
					marginTop: '0',
				}}
			>
				Step 2: Select sliced cake flavours
			</StyledPageHeading>

			<BtnWrapper>
				<StyledButton
					type="button"
					disabled={isDisabled}
					onClick={() => onAddToCartClick()}
				>
					ADD TO CART
				</StyledButton>

				<StyledButton
					type="button"
					disabled={isDisabled}
					onClick={() => onBuyNowClick()}
				>
					BUY NOW
				</StyledButton>
			</BtnWrapper>
		</Container>
	)
}
