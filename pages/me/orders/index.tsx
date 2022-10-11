import AppSEO from '@/components/App/SEO'
import { MeContainer } from '@/components/Me/MeContainer/MeContainer'
import { MyOrders } from '@/components/Me/MyOrders/MyOrders'

const Orders: React.FC = () => {
	return (
		<>
			<AppSEO title="My Orders" noIndex />
			<MeContainer
				render={(user) => (
					<div>
						<h3 className="page-title">My orders</h3>
						<MyOrders user={user} />
					</div>
				)}
			/>
		</>
	)
}

export default Orders
