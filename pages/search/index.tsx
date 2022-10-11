import { StyledPageContainer } from '@/styles/elements/container'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { useRouter } from 'next/router'
import { useProductsWithPagination } from '../../data/useProductsWithPagination'
import { StyledProductListingContainer } from '@/styles/pages/landing'
import Product from '@/components/Product'
import Search from '@/components/Search/Search'
import {
	StyledSearchResult,
	StyledSearchWrapper,
} from '@/styles/pages/search.styled'
import AppSEO from '@/components/App/SEO'

export default function SearchPage() {
	const router = useRouter()
	const { s } = router.query

	const handleSearch = (keywords) => router.push(`/search?s=${keywords}`)

	// TODO: check null case for search string is empty
	const { data: productListing } = useProductsWithPagination({
		limit: 40,
		search: s + '',
		status: 'active',
	})

	function structureBreadCrumbData() {
		return [
			{
				label: 'Home',
				url: '/',
			},
			{
				label: 'Search',
				url: null,
			},
		]
	}

	return (
		<>
			<AppSEO title="Search" noIndex />
			<main>
				<StyledPageContainer>
					<BreadCrumb data={structureBreadCrumbData()} />

					<StyledProductListingContainer>
						<StyledSearchWrapper>
							<h3 className="heading">Searched For</h3>
							<Search
								onSearch={handleSearch}
								defaultValue={s + ''}
								isDark={true}
							/>
						</StyledSearchWrapper>

						<StyledSearchResult>
							{productListing?.docs.length > 0 ? (
								<span>
									{productListing.docs.length} result
									{productListing.docs.length > 1 && 's'}{' '}
									found
								</span>
							) : (
								<span>
									There is no result for <i>{s}</i>
								</span>
							)}
						</StyledSearchResult>

						<section className="grid-wrapper">
							{productListing?.docs.map((item, index) => (
								<Product
									productDetail={item}
									key={item._id}
									index={index}
								/>
							))}
						</section>
					</StyledProductListingContainer>
				</StyledPageContainer>
			</main>
		</>
	)
}
