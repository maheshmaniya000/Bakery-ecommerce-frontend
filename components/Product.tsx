import { Anchor, StyledProduct } from '@/styles/elements'
import styled from '@emotion/styled'
import { Product as ProductInterface } from 'interfaces/Product'
import { getCDNImage } from 'lib/getCDNImage'
import { useIsSoldOut } from 'lib/hooks/useIsSoldOut'
import Link from 'next/link'
import { priceHelper } from '../utils/helper'

const OutOfStockContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 260px;
	width: 260px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(219, 203, 173, 0.363);

	@media (max-width: 768px) {
		height: 40vw;
		width: 40vw;
	}
`

const OutOfStock = styled.div`
	width: 80px;
	height: 80px;
	background: #7e5000;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	text-align: center;
`

const Image = styled.img`
	height: 260px !important;
	width: 260px !important;
	object-fit: cover;

	@media (max-width: 768px) {
		height: 40vw !important;
		width: 40vw !important;
	}

	@media (max-width: 425px) {
		width: 100% !important;
	}
`

interface Props {
	productDetail: ProductInterface
	// if product detail breadcrumb is supposed to show with category tag, pass category attribute
	category?: string
	isHref?: boolean
	index: number
}

function Product({ productDetail, category, isHref = true, index }: Props) {
	const [isSoldOut] = useIsSoldOut(productDetail)

	const url = category
		? `/cakes/${category}/${productDetail.slug}`
		: `/products/${productDetail.slug}`

	return (
		<StyledProduct
			initial={{ y: 10, opacity: 0.6 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: index * 0.1 }}
		>
			<Link href={isHref ? url : 'javascript:;'} passHref>
				<Anchor>
					<Image
						src={getCDNImage(productDetail.mainImage)}
						alt={productDetail.name}
					/>

					{isSoldOut && (
						<OutOfStockContainer>
							<OutOfStock>
								SOLD <br /> OUT
							</OutOfStock>
						</OutOfStockContainer>
					)}

					<h4 className="title">{productDetail.name}</h4>
					<p>
						{productDetail.variants.length > 0 && 'From '}
						S${' '}
						{priceHelper(
							productDetail.basePrice || productDetail.price
						)}
					</p>
				</Anchor>
			</Link>
		</StyledProduct>
	)
}

export default Product
