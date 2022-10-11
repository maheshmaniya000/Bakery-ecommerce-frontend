import { Anchor } from '@/styles/elements'
import { getCDNImage } from 'lib/getCDNImage'
import Link from 'next/link'
import { priceHelper } from 'utils/helper'

import { Container, Image, OutOfStockContainer, OutOfStock } from './_styled'

type Props = {
	title: string
	price: number
	image: string
	url: string
	isMultiPrice?: boolean
	isSoldOut?: boolean
	index?: number
}

export const ProductListCard = ({
	title,
	price,
	image,
	url,
	isSoldOut = false,
	isMultiPrice = false,
	index = 0,
}: Props) => {
	return (
		<Container
			initial={{ y: 10, opacity: 0.6 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: index * 0.1 }}
		>
			<Link href={url} passHref>
				<Anchor>
					<Image src={getCDNImage(image)} alt={title} />

					{isSoldOut && (
						<OutOfStockContainer>
							<OutOfStock>
								SOLD <br /> OUT
							</OutOfStock>
						</OutOfStockContainer>
					)}

					<h4 className="title">{title}</h4>
					<p>
						{isMultiPrice && 'From '}
						S$ {priceHelper(price)}
					</p>
				</Anchor>
			</Link>
		</Container>
	)
}
