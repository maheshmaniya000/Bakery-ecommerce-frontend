import styled from '@/types/styled'
import moment from 'moment'
import Link from 'next/link'
import numeral from 'numeral'

import { Order } from './interface/order'

const Container = styled.div`
	padding-bottom: 30px;
	border-bottom: 1px solid #e7d8c3;
	display: grid;
	grid-template-columns: auto minmax(0, 1fr) auto auto auto;
	margin-top: 30px;
	gap: 12px 0;

	&::first-of-type {
		margin-top: 50px;
	}

	@media (max-width: 768px) {
		grid-template-columns: auto minmax(0, 1fr) auto;
	}
`

const Status = styled.div`
	width: 130px;
	height: 53px;
	background: #f4f1ed;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-style: normal;
	font-weight: normal;
	font-size: 15px;
	line-height: 16px;
	letter-spacing: 0.05em;
	padding: 0px 15px;

	span {
		max-width: 80px;
	}
`

const RequirePayment = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* margin-right: 15px; */
	background: #f2eb2f;
	border: 1px solid #7e5000;
`

const Confirmed = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* margin-right: 15px; */
	background: #1ebd54;
	border: 1px solid #7e5000;
`

const Delivering = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* margin-right: 15px; */
	background: #6bafff;
	border: 1px solid #7e5000;
`

const Completed = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* margin-right: 15px; */
	background: #7e5000;
`

const Cancelled = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* margin-right: 15px; */
	background: #7c7167;
`

const RequirePaymentStatus = () => (
	<Status>
		<RequirePayment />
		Require <br /> Payment
	</Status>
)

const PendingPaymentStatus = () => (
	<Status>
		<RequirePayment />
		Pending <br /> Payment
	</Status>
)

const ConfirmedStatus = () => (
	<Status>
		<Confirmed />
		Confirmed
	</Status>
)
const DeliveringStatus = () => (
	<Status>
		<Delivering />
		Delivering
	</Status>
)
const CompletedStatus = () => (
	<Status>
		<Completed />
		Completed
	</Status>
)
const ReadyForCollectStatus = () => (
	<Status>
		<Completed />
		<span>Ready for collection</span>
	</Status>
)
const ProcessingStatus = () => (
	<Status>
		<Confirmed />
		Processing
	</Status>
)
const CancelledStatus = () => (
	<Status>
		<Cancelled />
		Cancelled
	</Status>
)

const ExpiredStatus = () => (
	<Status>
		<Cancelled />
		Expired
	</Status>
)

const OrderInfoContainer = styled.div`
	margin-left: 20px;

	@media (max-width: 768px) {
		grid-column: 2 / span 2;
	}
`

const OrderUniqueNo = styled.div`
	font-style: normal;
	font-weight: bold;
	font-size: 1.6rem;
	line-height: 20px;
	letter-spacing: 0.05em;
	color: #7e5000;
	text-transform: uppercase;
`

const Info = styled.div`
	margin-top: 10px;
	font-style: normal;
	font-weight: normal;
	font-size: 1.5rem;
	line-height: 2rem;
`

const OrderInfo = ({
	uniqueNo,
	created,
}: {
	uniqueNo: string
	created: Date
}) => (
	<OrderInfoContainer>
		<OrderUniqueNo>Order #{uniqueNo}</OrderUniqueNo>
		<Info>Ordered on {moment(created).format('D MMM YYYY, H:mma')}</Info>
	</OrderInfoContainer>
)

const Quantity = styled.span`
	font-size: 1.6rem;
	line-height: 1.9rem;
	letter-spacing: 0.05em;
	margin-left: 25px;
	color: #7e5000;
`

const RenderStatus = ({ status }) => {
	const statuses = {
		PENDING: <RequirePaymentStatus />,
		CONFIRM: <ConfirmedStatus />,
		PROCESSING: <ProcessingStatus />,
		DELIVERING: <DeliveringStatus />,
		COMPLETE: <CompletedStatus />,
		CANCELLED: <CancelledStatus />,
		PENDING_PAYMENT: <PendingPaymentStatus />,
		READY_FOR_COLLECTION: <ReadyForCollectStatus />,
		EXPIRED: <ExpiredStatus />,
	}
	return statuses[status] || <div />
}

const TotalAmount = styled.span`
	width: 100px;
	text-align: right;
	font-style: normal;
	font-weight: normal;
	font-size: 1.6rem;
	line-height: 1.9rem;
	letter-spacing: 0.05em;
	color: #7e5000;

	@media (max-width: 768px) {
		display: block;
		padding-left: 20px;
		text-align: left;
	}
`

const OrderLink = styled.div`
	width: 174px;
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.7rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;

	@media (max-width: 768px) {
		margin-right: 25px;
	}
`

interface Props {
	order: Order
}

const MyOrderItem = ({ order }: Props) => {
	const netTotal =
		order.totalAmount -
		(order.discount || order.virtualDiscount || 0) -
		order.paid

	let count = order.products.reduce((acc, curr) => acc + curr.quantity, 0)

	if (order.bundles) {
		count += order.bundles.reduce((acc, curr) => acc + curr.quantity, 0)
	}

	if (order.sliceBoxes) {
		count += order.sliceBoxes.reduce((acc, curr) => acc + curr.quantity, 0)
	}

	return (
		<Container>
			{/* TODO:  */}
			<RenderStatus status={order.status} />
			<OrderInfo created={order.created} uniqueNo={order.uniqueNo} />
			<Quantity>
				{count} {count === 1 ? 'item' : 'items'}
			</Quantity>
			<TotalAmount>
				{numeral(netTotal > 0 ? netTotal : 0).format('$ 0,0.00')}
			</TotalAmount>
			{order.status === 'CANCELLED' || order.status === 'EXPIRED' ? (
				<OrderLink />
			) : (
				<Link
					href={{
						pathname:
							order.status === 'PENDING' ||
							order.status === 'PENDING_PAYMENT'
								? `/me/checkout/[id]`
								: `/me/orders/[id]`,
						query: {
							id: order._id,
						},
					}}
				>
					<a>
						<OrderLink>
							{order.status === 'PENDING' ||
							order.status === 'PENDING_PAYMENT'
								? 'Make payment'
								: 'View/Manage'}
						</OrderLink>
					</a>
				</Link>
			)}
		</Container>
	)
}

export default MyOrderItem
