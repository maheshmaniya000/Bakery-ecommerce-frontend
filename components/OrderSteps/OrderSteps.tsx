import { StyledTabList } from '@/components/OrderSteps/OrderSteps.style'
import { ToolTip } from '@/components/ToolTip/ToolTip'
import { useRouter } from 'next/router'

interface Props {
	activeTab?: string
	tabChange?: (tab) => void
	orderData?: any
	orderPayload?: any
}

export const OrderSteps: React.FC<Props> = function ({
	activeTab = 'detail',
	tabChange,
	orderData,
	orderPayload,
}) {
	const router = useRouter()

	// determine order detail tab should be disabled or enabled
	// return @Object { disable state and message )
	function isDisabledStepOne(orderData) {
		const isDisabled = router.pathname === '/checkout/[id]'
		const message = "This step is already complete and can't go back"

		return [message, isDisabled]
	}

	// determine review tab should be disabled or enabled
	// return @Object { disable state and message )
	function isDisabledReview(orderData) {
		if (router.pathname === '/checkout/[id]') {
			const message = orderData
				? "This step is already complete and can't go back"
				: 'You need to fill order details first!'

			return [message, true]
		} else {
			return !orderPayload
				? ['You need to complete Order details', true]
				: []
		}
	}

	function isDisabledComplete(orderData) {
		const isDisabled = router.pathname !== '/checkout/[id]'
		const message = 'You need to complete Review and Pay!'

		return [message, isDisabled]
	}

	const [stepOneNotice, isStepOneDisabled] = isDisabledStepOne(orderData)
	const [reviewNotice, isReviewDisabled] = isDisabledReview(orderData)
	const [completeNotice, isCompleteDisabled] = isDisabledComplete(orderData)

	return (
		<StyledTabList>
			<li
				className={`${activeTab === 'detail' ? 'active' : ''} ${
					isStepOneDisabled ? ' disabled' : ''
				}`}
				onClick={() =>
					!isStepOneDisabled ? tabChange('detail') : null
				}
			>
				{isStepOneDisabled ? (
					<ToolTip message={stepOneNotice + ''}>
						<span className="badge">1</span>
					</ToolTip>
				) : (
					<span className="badge">1</span>
				)}
				<div>Order details</div>
			</li>
			<li
				className={`${activeTab === 'review' ? 'active' : ''} ${
					isReviewDisabled ? 'disabled' : ''
				}`}
				onClick={() => (!isReviewDisabled ? tabChange('review') : null)}
			>
				{isReviewDisabled ? (
					<ToolTip message={reviewNotice + ''}>
						<span className="badge">2</span>
					</ToolTip>
				) : (
					<span className="badge">2</span>
				)}
				<div>Review & Pay</div>
			</li>
			<li
				className={`${activeTab === 'order' ? 'active' : ''} ${
					isCompleteDisabled ? 'disabled' : ''
				}`}
				onClick={() =>
					!isCompleteDisabled ? tabChange('order') : null
				}
			>
				{isCompleteDisabled ? (
					<ToolTip message={completeNotice + ''}>
						<span className="badge">3</span>
					</ToolTip>
				) : (
					<span className="badge">3</span>
				)}
				<div>Order placed</div>
			</li>
		</StyledTabList>
	)
}
