import styled from '@/types/styled'
import { useMyOrder } from '../../../data/useMyOrder'
import MyOrderItem from './MyOrderItem'

const NoOrders = styled.div`
	margin-top: 60px;
	font-size: 2rem;
	text-align: center;
	font-weight: bold;
`

interface Props {
	user?: any
}
export const MyOrders: React.FC<Props> = ({ user }) => {
	const { data, error, loading } = useMyOrder(user.token)

	return (
		<div>
			{!loading && !error && data && (
				<>
					{data.docs.map((order) => (
						<MyOrderItem order={order} key={order._id} />
					))}
					{data.docs.length === 0 && (
						<NoOrders>No orders yet!</NoOrders>
					)}
				</>
			)}
		</div>
	)
}
