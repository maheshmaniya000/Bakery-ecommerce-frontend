import { StyledAddToCartPreview } from '@/components/AddToCartPreview/AddToCartPreview.style'
import { StyledButton } from '@/styles/elements'
import Popover from '@/components/PopOver/PopOver'
import { priceHelper, useIsMobile } from '../../utils/helper'
import { useEffect } from 'react'
import Link from 'next/link'
import styled from '@/types/styled'
import { getCDNImage } from 'lib/getCDNImage'

interface Props {
	image: string
	name: string
	price: number
	variant?: string
	qty?: number
	onClose: () => void
}

const Button = styled(StyledButton)`
	min-width: auto;
`

export const AddToCartPreview = ({
	name,
	image,
	price,
	variant = '',
	qty = 1,
	onClose,
}: Props) => {
	const isMobile = useIsMobile()
	let cbFunc

	useEffect(() => {
		// dismiss after 5 sec
		cbFunc = setTimeout(() => {
			onClose()
		}, 3000)
		return () => clearTimeout(cbFunc)
	}, [])

	function handleClose() {
		clearTimeout(cbFunc)
		onClose()
	}

	return (
		<Popover
			onClose={() => null}
			style={{ right: isMobile ? '5vw' : '50px' }}
		>
			<StyledAddToCartPreview>
				<div className="close" onClick={handleClose}>
					<img src="/images/icons/close.svg" />
				</div>
				<div className="heading">
					<span>
						<img src="/images/icons/success.svg" />
						Added to cart
					</span>
				</div>
				<div className="content">
					<img
						src={getCDNImage(image)}
						alt={name}
						className="thumbnail"
					/>
					<div className="info">
						<h3 className="product-heading">{name}</h3>
						{variant && <div className="variant">{variant}</div>}
						<div className="price">
							S$
							{priceHelper(price)} x {qty}
						</div>
					</div>
				</div>
				<div className="btn-wrap">
					<Link href="/shopping-cart">
						<Button mode="pale">View Cart</Button>
					</Link>
					<Link href="/checkout">
						<Button>Checkout</Button>
					</Link>
				</div>
			</StyledAddToCartPreview>
		</Popover>
	)
}
