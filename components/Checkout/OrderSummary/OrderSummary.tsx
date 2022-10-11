import {
	StyledPageHeading,
	StyledTextUppercase,
} from '@/styles/elements/typography'
import DeliveryInfo from '@/components/Checkout/DeliveryInfo/DeliveryInfo'
import { StyledOrderSummary } from '@/components/Checkout/OrderSummary/OrderSummary.style'
import moment from 'moment'
import OrderItem from '@/components/Checkout/OrderSummary/OrderItem/OrderItem'
import OrderGiftTag from './OrderGiftTag'
import { useState } from 'react'
import { Order } from '@/components/Me/MyOrders/interface/order'
import GiftTagInfo from './GiftTagInfo'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { priceHelper } from 'utils/helper'

import OrderInstruction from './OrderInstruction'
import OrderInstructionInfo from './OrderInstructionInfo'
import OrderSliceBoxItem from './OrderItem/OrderSliceBoxItem'
import OrderBundleItem from './OrderItem/OrderBundleItem'

const DeliveryDateContainer = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 150px;
`

const Back = styled.div`
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.7rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
	cursor: pointer;
	margin-top: 30px;
	margin-bottom: 10px;
`

interface Props {
	orderData?: Order
	mode: 'review' | 'checkout'
}
export const OrderSummary: React.FC<Props> = ({
	orderData,
	mode = 'checkout',
}) => {
	const router = useRouter()
	// const { data, error, loading } = useOrderDetail(orderData._id)
	const data = orderData
	const [isOpenGiftTag, setIsOpenGiftTag] = useState(
		router.pathname === '/me/orders/[id]' ? false : true
	)

	const [isOpenOrderInstruction, setIsOpenOrderInstruction] = useState(
		router.pathname === '/me/orders/[id]' ? false : true
	)

	// A Trio for A Hero
	const isSpecialProduct =
		orderData?.products.filter(
			(_product) => _product.product?._id === '60fa1fcf95384b01ffa5ad3a'
		).length > 0
			? true
			: false || false

	return (
		<section>
			{mode === 'checkout' && (
				<StyledPageHeading size="1.6rem">
					Thank you! <br />
					Your order has been placed.
				</StyledPageHeading>
			)}

			{!orderData && <span>Loading...</span>}
			{/* {loading && <span>Loading...</span>} */}
			{/* {error && <ErrorHandler message={error} />} */}

			{data && (
				<StyledOrderSummary>
					<DeliveryDateContainer>
						<h3 className="heading main-heading">
							{mode === 'checkout' ? 'Your order ' : 'Order '}
							<StyledTextUppercase>
								#{data.uniqueNo}
							</StyledTextUppercase>
						</h3>
						{mode === 'review' && (
							<Back
								onClick={() => {
									router.back()
								}}
							>
								Back to my orders
							</Back>
						)}
					</DeliveryDateContainer>
					<p className="delivery-date">
						Ordered on{' '}
						{moment(data.created).format('DD MMM yyyy, hh:mma')}
					</p>

					{data?.products.map((product) => (
						<OrderItem
							product={product}
							key={product._id}
							order={data}
						/>
					))}

					{data?.sliceBoxes?.map((box) => (
						<OrderSliceBoxItem box={box} key={box._id} />
					))}

					{data?.bundles?.map((bundle) => (
						<OrderBundleItem key={bundle._id} {...bundle} />
					))}

					{isOpenGiftTag ? (
						<OrderGiftTag
							order={data}
							onClose={() => {
								setIsOpenGiftTag(false)
							}}
						/>
					) : (
						<GiftTagInfo
							isEditable={
								data.status === 'PENDING' ||
								data.status === 'CONFIRM'
							}
							onOpen={() => {
								setIsOpenGiftTag(true)
							}}
							recipient={data.recipient.firstName}
							giftMessage={data.giftMessage}
						/>
					)}

					{isOpenOrderInstruction ? (
						<OrderInstruction
							title={
								isSpecialProduct
									? 'Write a message of encouragement for the Healthcare Hero'
									: undefined
							}
							placeholder={
								isSpecialProduct
									? "Write something, don't forget to sign off!"
									: undefined
							}
							order={data}
							onClose={() => {
								setIsOpenOrderInstruction(false)
							}}
						/>
					) : (
						<OrderInstructionInfo
							title={
								isSpecialProduct
									? 'Message of encouragement for the Healthcare Hero'
									: undefined
							}
							isEditable={
								data.status === 'PENDING' ||
								data.status === 'CONFIRM'
							}
							onOpen={() => {
								setIsOpenOrderInstruction(true)
							}}
							note={data.note}
						/>
					)}

					<div className="two-col-grid">
						<DeliveryInfo orderData={data} />
						<div>
							<h3 className="heading">Payment info</h3>
							{data.paymentType === 'HITPAY' ? (
								<h4 className="sub-heading">Hit Pay</h4>
							) : (
								<>
									<h4 className="sub-heading">Credit card</h4>
									{data.paymentLog?.charges?.data[0] && (
										<div className="card-container">
											<img
												src={`/images/icons/${data.paymentLog?.charges?.data[0]?.payment_method_details?.card?.brand.toLowerCase()}.svg`}
												className="brand-icon"
											/>{' '}
											****{' '}
											{
												data.paymentLog?.charges
													?.data[0]
													?.payment_method_details
													?.card?.last4
											}
										</div>
									)}
								</>
							)}
						</div>
					</div>

					<div>
						<h3 className="heading">Summary</h3>
						<ul className="summary-list">
							<li className="sub-heading">
								<h4>Bakes</h4>
								<div>
									$
									{priceHelper(
										data.products?.reduce(
											(prev, item) =>
												item.quantity * item.price +
												prev,
											0
										)
									)}
								</div>
							</li>
							{data.sliceBoxes && (
								<li className="sub-heading">
									<h4>Slice Boxes</h4>
									<div>
										$
										{priceHelper(
											data.sliceBoxes.reduce(
												(prev, item) =>
													prev + item.total,
												0
											)
										)}
									</div>
								</li>
							)}
							{data.bundles && (
								<li className="sub-heading">
									<h4>Bundles</h4>
									<div>
										$
										{priceHelper(
											data.bundles.reduce(
												(prev, item) =>
													prev +
													item.price * item.quantity,
												0
											)
										)}
									</div>
								</li>
							)}
							{data.promoCode && (
								<li className="sub-heading">
									<h4>
										Promo -{' '}
										{data?.usedCode || data.promoCode.code}
									</h4>
									<div>
										-$
										{priceHelper(data.discount || 0)}
									</div>
								</li>
							)}

							<li className="sub-heading">
								<h4>Delivery fee</h4>
								<div>
									${priceHelper(data.delivery?.price || 0)}
								</div>
							</li>

							{data.peakDaySurcharge > 0 && (
								<li className="sub-heading">
									<h4>Peak day surcharge</h4>
									<div>
										$
										{priceHelper(
											data.peakDaySurcharge || 0
										)}
									</div>
								</li>
							)}

							<li className="sub-heading">
								<h4>Total</h4>
								<div className="grand-total">
									$
									{priceHelper(
										data.totalAmount - (data.discount || 0),
										false
									)}
								</div>
							</li>
						</ul>
					</div>
				</StyledOrderSummary>
			)}
		</section>
	)
}
