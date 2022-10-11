import { StyledDeliveryInfo } from '@/components/Checkout/DeliveryInfo/DeliveryInfo.style'
import moment from 'moment'

const DeliveryInfo = ({ orderData }) => {
	return (
		<StyledDeliveryInfo>
			<h3>Delivery info</h3>

			<div className="content">
				<h4 className="label">Recipient info</h4>
				<p className="info">
					{orderData?.recipient?.firstName}{' '}
					{orderData?.recipient?.lastName} <br />
					{orderData?.recipient?.mobileNo}
				</p>
			</div>

			<div className="content">
				<h4 className="label">Delivery method</h4>
				<p className="info">
					{orderData?.delivery?.method?.name}
					<br />
					{orderData?.delivery?.specificTime && (
						<>
							{orderData?.delivery?.specificTime?.name ||
								`${orderData?.delivery?.specificTime.startTime} ~ ${orderData?.delivery?.specificTime.endTime}`}
							<br />
						</>
					)}
					{orderData?.delivery?.price > 0 && (
						<>
							{orderData?.delivery?.address} <br />
							{orderData?.delivery?.buildingUnitNo} <br />
							{orderData?.delivery?.postalCode}
						</>
					)}
				</p>
			</div>

			<div className="content">
				<h4 className="label">Delivery date</h4>
				<p className="info">
					{moment(orderData?.orderDate).format('ddd, DD MMM yyyy')}{' '}
					<br />
				</p>
			</div>

			<div className="content">
				<h4 className="label">Sender info</h4>
				<p className="info">
					{orderData?.sender?.firstName} {orderData?.sender?.lastName}{' '}
					<br />
					{orderData?.sender?.mobileNo} <br />
					{orderData?.sender?.email} <br />
				</p>
			</div>
		</StyledDeliveryInfo>
	)
}

export default DeliveryInfo
