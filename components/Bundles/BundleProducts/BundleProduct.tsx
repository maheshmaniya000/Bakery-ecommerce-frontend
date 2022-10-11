import { StyledEditImage } from '@/components/Cart/CartItem/CartItem.style'
import EditSpecialItem from '@/components/Cart/EditSpecialItem/EditSpecialItem'
import { AnimatePresence } from 'framer-motion'
import { Product } from 'interfaces/Product'
import { useState } from 'react'
import {
	Title,
	Qty,
	TitleContainer,
	Container,
	SpecialInfo,
	Slider,
} from './styles'

type Props = {
	qty: number
	product: Product
}

export function BundleProduct({ qty, product }: Props) {
	const [showEditModal, toggleEditModal] = useState(false)

	function handleOnSubmit(values) {
		window.alert(values)
	}

	return (
		<Container>
			<TitleContainer>
				<Title style={{ flex: 1 }}>{product.name}</Title>
				<Qty>x {qty}</Qty>
			</TitleContainer>

			{product.isSpecial && (
				<SpecialInfo>
					<li>Candles (standard size):</li>
					<li>Cake Knife: No</li>
					{!product.isNoCakeText && <li>Cake Text: </li>}
					<li>
						Edit{' '}
						<StyledEditImage
							src="/images/icons/edit-icon.svg"
							onClick={() => toggleEditModal(true)}
						/>
					</li>
				</SpecialInfo>
			)}

			<Slider />

			<AnimatePresence>
				<EditSpecialItem
					toggleModal={toggleEditModal}
					showModal={showEditModal}
					productDetail={{}}
					isNoCakeText={product.isNoCakeText}
					onSubmit={handleOnSubmit}
				/>
			</AnimatePresence>
		</Container>
	)
}
