import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { StyledBaseContainer } from '@/styles/elements'
import {
	StyledDescription,
	StyledProductDetailContainer,
	StyledProductInfo,
} from '@/components/ProductDetail/ProductDetail.style'
import { useRouter } from 'next/router'
import { useBundle } from 'data/useBundle'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { ProductImage } from '@/components/Products/ProductImage/ProductImage'
import { StyledPageHeading } from '@/styles/elements/typography'
import { priceHelper } from 'utils/helper'
import { useContext, useState } from 'react'
import { BundlePopupPreview } from '@/components/Bundles/BundlePopUpPreview/BundlePopupPreview'
import { ApplicationContext } from 'context/ApplicationContext'
import { BundleForm } from '@/components/Bundles/BundleForm/BundleForm'
import { BundleFormValues } from '@/components/Bundles/BundleForm/BundleFormValues'

type PopUpPreview = {
	timestamp?: number
	qty?: number
	name: string
	image: string
	price: number
}

const BundleDetailPage = () => {
	const [popUpPreview, setPopUpPreview] = useState<PopUpPreview>()

	const router = useRouter()
	const { slug } = router.query
	const { data: bundle, loading } = useBundle(slug[0] ?? '')
	const { addBundleToCart } = useContext(ApplicationContext)

	if (loading) return null

	const images = [bundle.image, ...bundle.images]

	function renderBreadcrumb() {
		return (
			<BreadCrumb
				data={[
					{ label: 'Home', url: '/' },
					{ label: 'Bundles', url: '/bundles' },
					{ label: bundle.name, url: null },
				]}
			/>
		)
	}

	function handleOnSubmit(values: BundleFormValues) {
		setPopUpPreview({
			timestamp: Date.now(),
			qty: values.quantity,
			name: bundle.name,
			image: bundle.image,
			price: bundle.price,
		})

		addBundleToCart(bundle, values)

		if (values.isBuyNow) {
			router.push('/shopping-cart')
		}
	}

	return (
		<Layout>
			<Head>
				<title>{bundle?.name} | Online Bake House</title>
			</Head>
			<main>
				<StyledBaseContainer>
					<StyledProductDetailContainer>
						<BundlePopupPreview {...popUpPreview} />
						{renderBreadcrumb()}
						<div className="content">
							<ProductImage images={images} alt={bundle.name} />

							<StyledProductInfo>
								<StyledPageHeading size="1.6rem">
									{bundle.name}
								</StyledPageHeading>
								<div className="price">
									S$ {priceHelper(bundle.price)}
								</div>

								{bundle && (
									<BundleForm
										bundle={bundle}
										onSubmit={handleOnSubmit}
									/>
								)}

								<StyledDescription>
									<div
										className="description"
										dangerouslySetInnerHTML={{
											__html: bundle.description,
										}}
									/>
								</StyledDescription>
							</StyledProductInfo>
						</div>
					</StyledProductDetailContainer>
				</StyledBaseContainer>
			</main>
		</Layout>
	)
}

export default BundleDetailPage
