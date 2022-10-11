import { StyledTabList } from '@/components/OrderSteps/OrderSteps.style'
import { ToolTip } from '@/components/ToolTip/ToolTip'
import styled from '@emotion/styled'

const Container = styled.div`
	margin-top: 30px;
`

interface Props {
	activeTab?: string
	tabChange?: (tab) => void
	orderData?: any
}

export const MyOrderDetailsSteps: React.FC<Props> = function ({
	activeTab = 'CONFIRM',
	tabChange,
	orderData,
}) {
	// determine order detail tab should be disabled or enabled
	// return @Object { disable state and message )
	function isDisabledStepOne(orderData) {
		const isDisabled = orderData?._id && orderData?.status !== 'CONFIRM'
		const message = 'Cannot go this step'

		return [message, isDisabled]
	}

	// determine review tab should be disabled or enabled
	// return @Object { disable state and message )
	function idDisabledDelivering(orderData) {
		const isDisabled = !orderData?._id || orderData?.status !== 'DELIVERING'
		const message = 'Cannot go this step'
		return [message, isDisabled]
	}

	function isDisabledComplete(orderData) {
		const isDisabled = !orderData?._id || orderData?.status !== 'COMPLETE'
		const message = 'Cannot go this step'

		return [message, isDisabled]
	}

	function isSelfCollect() {
		return orderData && orderData.delivery.method.needPostalCode === false
	}

	const [stepOneNotice, isStepOneDisabled] = isDisabledStepOne(orderData)
	const [reviewNotice, isReviewDisabled] = idDisabledDelivering(orderData)
	const [completeNotice, isCompleteDisabled] = isDisabledComplete(orderData)

	return (
		<Container>
			<StyledTabList>
				<li
					className={`${activeTab === 'CONFIRM' ? 'active' : ''} ${
						isStepOneDisabled ? ' disabled' : ''
					}`}
					onClick={() =>
						!isStepOneDisabled ? tabChange('CONFIRM') : null
					}
				>
					{isStepOneDisabled ? (
						<ToolTip message={stepOneNotice + ''}>
							<span className="badge">1</span>
						</ToolTip>
					) : (
						<span className="badge">1</span>
					)}
					<div>Confirmed</div>
				</li>

				{isSelfCollect() && (
					<>
						<li
							className={`${
								activeTab === 'DELIVERING' ? 'active' : ''
							} ${isReviewDisabled ? 'disabled' : ''}`}
							onClick={() =>
								!isReviewDisabled
									? tabChange('DELIVERING')
									: null
							}
						>
							{isReviewDisabled ? (
								<ToolTip message={reviewNotice + ''}>
									<span className="badge">2</span>
								</ToolTip>
							) : (
								<span className="badge">2</span>
							)}
							<div>Ready to collect</div>
						</li>
						<li
							className={`${
								activeTab === 'COMPLETED' ? 'active' : ''
							} ${isDisabledComplete ? 'disabled' : ''}`}
							onClick={() =>
								!isDisabledComplete
									? tabChange('COMPLETED')
									: null
							}
						>
							{isReviewDisabled ? (
								<ToolTip message={completeNotice + ''}>
									<span className="badge">3</span>
								</ToolTip>
							) : (
								<span className="badge">3</span>
							)}
							<div>Completed</div>
						</li>
					</>
				)}

				{!isSelfCollect() && (
					<>
						<li
							className={`${
								activeTab === 'DELIVERING' ? 'active' : ''
							} ${isReviewDisabled ? 'disabled' : ''}`}
							onClick={() =>
								!isReviewDisabled
									? tabChange('DELIVERING')
									: null
							}
						>
							{isReviewDisabled ? (
								<ToolTip message={reviewNotice + ''}>
									<span className="badge">2</span>
								</ToolTip>
							) : (
								<span className="badge">2</span>
							)}
							<div>Delivering</div>
						</li>
						<li
							className={`${
								activeTab === 'COMPLETE' ? 'active' : ''
							} ${isCompleteDisabled ? 'disabled' : ''}`}
							onClick={() =>
								!isCompleteDisabled
									? tabChange('COMPLETE')
									: null
							}
						>
							{isCompleteDisabled ? (
								<ToolTip message={completeNotice + ''}>
									<span className="badge">3</span>
								</ToolTip>
							) : (
								<span className="badge">3</span>
							)}
							<div>Delivered</div>
						</li>
					</>
				)}
			</StyledTabList>
		</Container>
	)
}
