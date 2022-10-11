import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { Layout } from '@/components/Layout'
import { StyledPageContainer } from '@/styles/elements/container'
import { StyledCategoryHeading } from '@/styles/pages/category-detail'
import { StyledProductListingContainer } from '@/styles/pages/landing'
import Head from 'next/head'
import styled from '@/types/styled'
import { StyledPageHeading } from '@/styles/elements/typography'
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter'
import { useState } from 'react'
import { useBundles } from 'data/useBundles'
import { ProductListCard } from '@/components/Products/ProductListCard/ProductListCard'

const breadcrumb = [
	{ label: 'Home', url: '/' },
	{ label: 'Bundles', url: null },
]

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

export const BundlesPage = () => {
	const [sortBy, setSortBy] = useState('')
	const { data: bundles } = useBundles(sortBy)

	return (
		<Layout>
			<Head>
				<title>Bundles | Online Bake House</title>
			</Head>
			<main>
				<StyledPageContainer>
					<BreadCrumb data={breadcrumb} />

					<StyledProductListingContainer>
						<StyledCategoryHeading>
							<HeadingContainer>
								<StyledPageHeading
									size="1.8rem"
									className="heading"
								>
									Bundles
								</StyledPageHeading>
								<SlicedCakesInfo>
									Lorem ipsum, dolor sit amet consectetur
									adipisicing elit. Amet expedita provident
									vitae maxime? Obcaecati, earum odio laborum
									voluptate doloribus excepturi provident
									laudantium? Dolorum sapiente soluta
									asperiores veritatis maiores perferendis
									quibusdam!
								</SlicedCakesInfo>
							</HeadingContainer>
							<CategoryFilter onChange={setSortBy} />
						</StyledCategoryHeading>

						<section className="grid-wrapper">
							{bundles.map((item, index) => (
								<ProductListCard
									title={item.name}
									price={item.price}
									image={item.image}
									url={`/bundles/${item.slug}`}
									key={item._id}
									index={index}
								/>
							))}
						</section>
					</StyledProductListingContainer>
				</StyledPageContainer>
			</main>
		</Layout>
	)
}

export default BundlesPage
