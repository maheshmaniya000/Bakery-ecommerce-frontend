import { Form, Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'

import {
	StyledCartItem,
	StyledEditImage,
} from '@/components/Cart/CartItem/CartItem.style'
import Counter from '@/components/ui/Counter/Counter'
import { priceHelper } from '../../../utils/helper'
import { Anchor } from '@/styles/elements'
import { ApplicationContext } from '../../../context/ApplicationContext'
import CartVariantSelect from '@/components/Cart/CartVariantSelect/CartVariantSelect'
import EditSpecialItem from '@/components/Cart/EditSpecialItem/EditSpecialItem'
import { AnimatePresence } from 'framer-motion'
import { useProductDetail } from 'data/useProductDetail'
import styled from '@emotion/styled'

const ProductNameContainer = styled.div`
	display: flex;
`

const OutOfStockImage = styled.img`
	margin-right: 12px;
`

interface Props {
	product: any
	showEarliestDate: boolean
}

const CartItem = ({ product, showEarliestDate = false }: Props) => {
	const {
		data: productData,
		// loading: productLoading,
		// error: productError,
	} = useProductDetail(product?.product?.slug || '')
	const [showEditModal, toggleEditModal] = useState(false)
	const [earliestAvailableDate, setEarliestAvailableDate] = useState('')
	const { updateItemFromCart, removeItemFromCart } =
		useContext(ApplicationContext)

	useEffect(() => {
		if (productData) {
			if (productData.variants.length > 0 && product.variantProduct) {
				setEarliestAvailableDate(
					product.variantProduct.stocks[0]?.date || ''
				)
			} else {
				setEarliestAvailableDate(productData.stocks[0]?.date || '')
			}
		}
	}, [productData, product.variantProduct])

	const variantStocks = productData?.variants.reduce(
		(acc, cur) => cur.stocks.length + acc,
		0
	)
	const stock = productData?.stocks.length + variantStocks || 0

	const handleQuantityChange = ({ product, quantity }) => {
		updateItemFromCart({ ...product, quantity })
	}

	const handleRemove = (id) => removeItemFromCart(id)

	const handleSizeChange = (val) =>
		updateItemFromCart({ ...product, variantProduct: val })

	function handleOnEditSpecialSubmit(values) {
		updateItemFromCart({ ...product, ...values })
		toggleEditModal(false)
	}

	return (
		<StyledCartItem>
			<img
				src={product?.product?.mainImage}
				alt={product?.product?.name}
				className="thumbnail"
			/>
			<div className="product-info">
				<ProductNameContainer>
					{!stock && (
						<OutOfStockImage
							src="/images/icons/error.svg"
							alt="error"
						/>
					)}
					<h4 className="product-name">{product?.product?.name}</h4>
				</ProductNameContainer>

				{/* product variants */}
				{product.variantProduct && (
					<div className="cart-variant-wrapper">
						<CartVariantSelect
							options={product?.product?.variants || []}
							optionsMatcher={['size', '_id']}
							onSelect={handleSizeChange}
							defaultValue={product.variantProduct}
						/>
					</div>
				)}

				{showEarliestDate && earliestAvailableDate && (
					<ul className="special-product-info">
						<li>
							Earliest date is{' '}
							{moment(earliestAvailableDate).format(
								'DD MMM YYYY'
							)}
						</li>
					</ul>
				)}

				{/* special product properties */}
				{product?.product?.isSpecial && (
					<ul className="special-product-info">
						<li>Candles (standard size): {product.candles}</li>
						<li>
							Cake Knife: {product.knifes === 1 ? 'yes' : 'no'}
						</li>
						{!product.product.isNoCakeText && (
							<li>Cake Text: {product.message} </li>
						)}
						<li>
							Edit{' '}
							<StyledEditImage
								src="/images/icons/edit-icon.svg"
								onClick={() => toggleEditModal(true)}
							/>
						</li>
					</ul>
				)}

				{/* edit popup for special item */}
				<AnimatePresence>
					<EditSpecialItem
						toggleModal={toggleEditModal}
						showModal={showEditModal}
						productDetail={product || {}}
						isNoCakeText={product?.product?.isNoCakeText}
						onSubmit={handleOnEditSpecialSubmit}
					/>
				</AnimatePresence>

				<div className="remove-link">
					<Anchor
						isUnderline={true}
						onClick={() => handleRemove(product.product_id)}
					>
						Remove
					</Anchor>
				</div>
			</div>

			<div className="quantity-input">
				<Formik
					initialValues={{
						quantity: product?.quantity,
						product,
					}}
					enableReinitialize={true}
					onSubmit={handleQuantityChange}
				>
					{({ handleSubmit, setFieldValue }) => (
						<Form onSubmit={handleSubmit}>
							<Counter
								min={1}
								max={10}
								initialValue={product?.quantity}
								onChange={(qty) => {
									setFieldValue('quantity', qty)

									handleSubmit()
								}}
							/>
						</Form>
					)}
				</Formik>
			</div>

			{product.variantProduct ? (
				<div className="price">
					S$
					{priceHelper(
						product.variantProduct?.price * product.quantity
					)}
				</div>
			) : (
				<div className="price">
					S$
					{priceHelper(
						(product.product.basePrice || product.product.price) *
							product.quantity
					)}
				</div>
			)}
		</StyledCartItem>
	)
}

export default CartItem
