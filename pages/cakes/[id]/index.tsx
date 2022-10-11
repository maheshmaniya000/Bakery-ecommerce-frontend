import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useCategoryDetail } from '../../../data/useCategoryDetail'

import { StyledProductListingContainer } from '@/styles/pages/landing'
import { StyledCategoryHeading } from '@/styles/pages/category-detail'
import { StyledPageContainer } from '@/styles/elements/container'

import Product from '@/components/Product'
import { Layout } from '@/components/Layout'
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { StyledPageHeading } from '@/styles/elements/typography'
import styled from '@/types/styled'
import useProductsByCategory from 'data/useProductsByCategory'
import { ProductListCard } from '@/components/Products/ProductListCard/ProductListCard'

const SlicedCakesInfo = styled.div`
	& > p {
		margin-bottom: 12px;
	}
`

const HeadingContainer = styled.div`
	max-width: 70%;

	@media (max-width: 768px) {
		max-width: 100%;
	}
`

const CategoryDetail = () => {
	const [sortBy, setSortBy] = useState('')

	const router = useRouter()
	const { id } = router.query

	const { data: products, loading: isLoading } = useProductsByCategory({
		slug: id.toString(),
		sort: sortBy,
	})
	const { data: categoryDetail } = useCategoryDetail(id)

	function structureBreadCrumbData(categoryDetail) {
		return [
			{
				label: 'Home',
				url: '/',
			},
			{
				label: categoryDetail.name,
				url: null,
			},
		]
	}

	return (
		<Layout>
			<Head>
				<title>{categoryDetail?.name} | Online Bake House</title>
			</Head>
			<main>
				{isLoading ? (
					<Loading>
						<div className="loader">
							<DotFlashing />
						</div>
					</Loading>
				) : (
					<StyledPageContainer>
						{categoryDetail && categoryDetail && (
							<BreadCrumb
								data={structureBreadCrumbData(categoryDetail)}
							/>
						)}
						<StyledProductListingContainer>
							<StyledCategoryHeading>
								<HeadingContainer>
									<StyledPageHeading
										size="1.8rem"
										className="heading"
									>
										{categoryDetail?.name}
									</StyledPageHeading>
									<SlicedCakesInfo
										dangerouslySetInnerHTML={{
											__html:
												categoryDetail?.description ||
												'',
										}}
									/>
								</HeadingContainer>
								<CategoryFilter onChange={setSortBy} />
							</StyledCategoryHeading>
							<section className="grid-wrapper">
								{products.map((item, index) => {
									if (item.type === 'bundle') {
										return (
											<ProductListCard
												title={item.name}
												price={item.price}
												// eslint-disable-next-line
												// @ts-ignore
												image={item.image}
												url={`/bundles/${item.slug}`}
												key={item._id}
												index={index}
											/>
										)
									}

									return (
										<Product
											productDetail={item}
											key={item._id}
											category={id + ''}
											index={index}
										/>
									)
								})}
							</section>
						</StyledProductListingContainer>
					</StyledPageContainer>
				)}
			</main>
		</Layout>
	)
}

export default CategoryDetail

const Loading = styled.div`
	position: relative;

	.loader {
		display: flex;
		justify-content: center;
		margin-top: 15%;
		left: 50%;
		position: relative;
		transform: translate(-50%, -50%);
	}
`
const DotFlashing = styled.div`
	position: relative;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: #7e5000;
	color: #7e5000;
	animation: dotFlashing 1s infinite linear alternate;
	animation-delay: 0.5s;

	::before,
	::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}

	::before {
		left: -35px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #7e5000;
		color: #7e5000;
		animation: dotFlashing 1s infinite alternate;
		animation-delay: 0s;
	}

	::after {
		left: 35px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #7e5000;
		color: #7e5000;
		animation: dotFlashing 1s infinite alternate;
		animation-delay: 1s;
	}

	@keyframes dotFlashing {
		0% {
			background-color: #7e5000;
		}
		50%,
		100% {
			background-color: #e7d8c380;
		}
	}
`
