import { useState, useEffect, useContext } from 'react'
import { maxBy } from 'lodash'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import moment from 'moment'

import { useProductDetail } from '../../data/useProductDetail'

import { Layout } from '@/components/Layout'
import {
	StyledDescription,
	StyledDetailBtnGroup,
	StyledForm,
	StyledFormGroup,
	StyledProductDetailContainer,
	StyledProductInfo,
	StyledSubmit,
} from './ProductDetail.style'
import { priceHelper } from '../../utils/helper'
import SizeSelect from '@/components/SizeSelect/SizeSelect'
import { Counter } from '@/components/Counter/Counter'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { StyledBaseContainer } from '@/styles/elements'
import { ProductSpecialForm } from '@/components/ProductSpecialForm/ProductSpecialForm'
import { Form, Field } from 'formik'
import { ApplicationContext } from '../../context/ApplicationContext'
import { AddToCartPreview } from '../AddToCartPreview/AddToCartPreview'
import { StyledPageHeading } from '@/styles/elements/typography'
import MoreItem from '../MoreItem'

import * as Yup from 'yup'

import useYMAL from 'data/useYMAL'
import { InfoText } from '../ui/InfoText/InfoText'
import { ProductImage } from '../Products/ProductImage/ProductImage'

const schema = Yup.object().shape({
	knifes: Yup.string().required().label('Knifes'),
})

const ProductDetail = () => {
	const [price, setPrice] = useState(0)
	const [maximumAvailableQty, setMaximumAvailableQty] = useState(0)
	const [earliestAvailableDate, setEarliestAvailableDate] = useState('')
	const [stocks, setStocks] = useState([])
	const [previewDetail, setPreviewDetail] = useState({})
	const [showPreview, togglePreview] = useState(false)
	const router = useRouter()
	const { id, productId } = router.query
	const [activeImageIndex, setActiveImageIndex] = useState(0)

	const { data: productDetail } = useProductDetail(productId)
	const { data: products } = useYMAL({ productId: productDetail?._id })

	const { addToCart } = useContext(ApplicationContext)

	const getVariantImages = () => {
		const variants = productDetail?.variants || []
		if (variants.length) {
			const images = variants.reduce((accumulator, current) => {
				;(current.images || []).forEach((image) => {
					accumulator.push(image)
				})
				return accumulator
			}, [])
			return images
		} else return []
	}
	const variantImages = getVariantImages()
	const images = [
		productDetail?.mainImage,
		...(productDetail?.images || []),
		...(variantImages || []),
	]

	/**
	 * set each state of the items if product detail was changed
	 */
	useEffect(() => {
		if (productDetail) {
			if (productDetail.variants.length > 0) {
				const productHasStock = productDetail.variants.find(
					(v) => v.stocks.length > 0
				)

				const temp = productHasStock || productDetail.variants[0]

				setPrice(temp.price)
				setMaximumAvailableQty(maxBy(temp.stocks, 'qty')?.qty || 0)
				setEarliestAvailableDate(temp?.stocks[0]?.date || '')
				setStocks(temp.stocks)
			} else {
				setPrice(productDetail.basePrice || productDetail.price)
				setMaximumAvailableQty(
					maxBy(productDetail.stocks, 'qty')?.qty || 0
				)
				setEarliestAvailableDate(productDetail.stocks[0]?.date || '')
				setStocks(productDetail.stocks)
			}
		}
	}, [productDetail])

	// set each values into specific states if variant options was changed
	function onSizeChange(val) {
		if (val.images) {
			const foundIndex = images.findIndex(
				(image) => image === val.images[0]
			)
			if (foundIndex !== -1) setActiveImageIndex(foundIndex)
		}

		setPrice(val.price)

		setMaximumAvailableQty(maxBy(val?.stocks, 'qty')?.qty || 0)

		setEarliestAvailableDate(val?.stocks[0]?.date || '')

		setStocks(val?.stocks || [])
	}

	function structureBreadCrumbData(productDetail) {
		return [
			{
				label: 'Home',
				url: '/',
			},
			id && {
				label: id.toString(),
				url: '/cakes/' + id,
			},
			{
				label: productDetail.name,
				url: null,
			},
		].filter(Boolean) // id might be undefiend at some cases and this will help to ignore null cases
	}

	function onSubmit(val) {
		// set product detail for preview in cart list, will remove once the backend provide actual value
		addToCart({ ...val, product: productDetail })
		togglePreview(true)
		setPreviewDetail({ ...val, ...productDetail })
	}

	return (
		<Layout>
			<Head>
				<title>{productDetail?.name} | Online Bake House</title>
			</Head>
			<main>
				<StyledBaseContainer>
					<StyledProductDetailContainer>
						<AnimatePresence>
							{showPreview && (
								<AddToCartPreview
									name={previewDetail.name}
									image={previewDetail.mainImage}
									variant={
										previewDetail?.variantProduct?.size
									}
									price={
										previewDetail.variantProduct
											? previewDetail.variantProduct.price
											: previewDetail.price
									}
									qty={previewDetail.quantity}
									onClose={() => togglePreview(false)}
								/>
							)}
						</AnimatePresence>
						<BreadCrumb
							data={structureBreadCrumbData(productDetail || {})}
						/>
						<div className="content">
							<ProductImage
								images={images}
								alt={productDetail?.name || ''}
								initialCurrent={activeImageIndex}
							/>

							<StyledProductInfo>
								<StyledPageHeading size="1.6rem">
									{productDetail?.name}
								</StyledPageHeading>
								<div className="price">
									S$ {priceHelper(price)}
								</div>

								<StyledForm
									initialValues={{
										// eslint-disable-next-line
										product_id: productDetail?._id,
										variantProduct: '',
										quantity: 1,
										...(productDetail?.isSpecial && {
											message: '',
											candles: 0,
											knifes: '',
										}),
										buyNow: false,
									}}
									validationSchema={
										productDetail?.isSpecial
											? schema
											: undefined
									}
									enableReinitialize={true}
									onSubmit={onSubmit}
								>
									{({
										values,
										handleSubmit,
										setFieldValue,
									}) => {
										if (
											!values.variantProduct &&
											productDetail?.variants.length > 0
										) {
											const hasStock = productDetail.variants.find(
												(v) => v.stocks.length > 0
											)

											setFieldValue(
												'variantProduct',
												hasStock ||
													productDetail.variants[0]
											)
										}

										return (
											<Form onSubmit={handleSubmit}>
												<StyledFormGroup
													style={{
														marginBottom: '20px',
													}}
												>
													{productDetail?.variants
														.length > 0 && (
														<SizeSelect
															options={
																productDetail?.variants ||
																[]
															}
															padding="2px 8px 2px 75px"
															optionsMatcher={[
																'size',
																'_id',
															]}
															label="Options:"
															name="variantProduct"
															onSelect={(val) => {
																onSizeChange(
																	val
																)
																// reset quantity back to 1 to restrict unexpected behavior
																setFieldValue(
																	'quantity',
																	1
																)
															}}
														/>
													)}

													{stocks.length > 0 && (
														<Counter
															min={1}
															max={
																maximumAvailableQty
															}
															value={
																values.quantity
															}
															onChange={(q) => {
																setFieldValue(
																	'quantity',
																	q
																)

																setEarliestAvailableDate(
																	stocks.find(
																		({
																			qty,
																		}) =>
																			q <=
																			qty
																	)?.date ||
																		''
																)
															}}
														/>
													)}
												</StyledFormGroup>

												{stocks?.length > 0 &&
													productDetail?.isSpecial && (
														<ProductSpecialForm
															isNoCakeText={
																productDetail.isNoCakeText
															}
														/>
													)}

												<Field
													name="buyNow"
													type="hidden"
												/>

												{productDetail && (
													<div
														style={{
															marginBottom:
																'15px',
														}}
													>
														<InfoText
															text={
																stocks.length >
																0
																	? `
															Earliest delivery date is
															${
																earliestAvailableDate
																	? moment(
																			earliestAvailableDate
																	  ).format(
																			'DD-MM-YYYY'
																	  )
																	: 'Not Known!'
															}
														`
																	: 'Out Of Stock!'
															}
														/>
													</div>
												)}

												<StyledDetailBtnGroup>
													<StyledSubmit
														type="submit"
														disabled={
															stocks?.length === 0
														}
														onClick={() => {
															setFieldValue(
																'buyNow',
																false
															)
														}}
													>
														Add To Cart
													</StyledSubmit>

													<StyledSubmit
														type="submit"
														disabled={
															stocks?.length === 0
														}
														onClick={() => {
															setFieldValue(
																'buyNow',
																true
															)
															if (
																!setFieldValue
															) {
																setTimeout(
																	() => {
																		router.push(
																			'/shopping-cart'
																		)
																	},
																	0
																)
															}
														}}
													>
														Buy Now
													</StyledSubmit>
												</StyledDetailBtnGroup>
											</Form>
										)
									}}
								</StyledForm>

								<StyledDescription>
									<div
										className="description"
										dangerouslySetInnerHTML={{
											__html: productDetail?.description,
										}}
									/>
								</StyledDescription>
							</StyledProductInfo>
						</div>
					</StyledProductDetailContainer>
					<MoreItem
						title="You might also like"
						link={'/cakes/' + id}
						products={products}
					/>
				</StyledBaseContainer>
			</main>
		</Layout>
	)
}

export default ProductDetail
