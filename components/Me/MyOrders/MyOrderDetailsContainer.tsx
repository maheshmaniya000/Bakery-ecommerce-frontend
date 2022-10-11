import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { OrderSteps } from '@/components/OrderSteps/OrderSteps'
import {
	StyledPageContainer,
	StyledSummaryContainer,
} from '@/styles/elements/container'
import {
	StyledCheckoutContainer,
	StyledNoticeContainer,
} from '@/styles/pages/checkout.style'
import CheckoutSummary from '@/components/Checkout/CheckoutSummary/CheckoutSummary'
import { ApplicationContext } from '../../../context/ApplicationContext'
import { CheckoutFormStep1 } from '@/components/Checkout/CheckoutFormStep1/CheckoutFormStep1'
import DeliveryInfo from '@/components/Checkout/DeliveryInfo/DeliveryInfo'
import { Payment } from '@/components/Checkout/Payment/Payment'
import { OrderSummary } from '@/components/Checkout/OrderSummary/OrderSummary'
import { RequestForRegister } from '@/components/Checkout/RequestForRegister/RequestForRegister'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router'
import { useUser } from '../../../data/useUser'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import { MyOrderDetailsSteps } from './MyOrderDetailsSteps'
import NeedHelp from './NeedHelp'

const breadCrumbData = [
	{
		label: 'My account',
		url: '/me',
	},
	{
		label: 'My Orders',
		url: '/me/orders',
	},
	{
		label: 'Order details',
		url: null,
	},
]

interface Props {
	orderData?: any
}
// a centralized container component for checkout
export const MyOrderDetailsContainer: React.FC<Props> = ({ orderData }) => {
	const { cart, checkCartItemsHaveDeliverableDate } = useContext(
		ApplicationContext
	)
	const [currentStep, setCurrentStep] = useState<
		'CONFIRM' | 'DELIVERING' | 'COMPLETE'
	>('CONFIRM')
	const { user } = useUser({})
	const router = useRouter()

	useEffect(() => {
		if (
			!orderData?._id &&
			(cart?.length < 1 || !checkCartItemsHaveDeliverableDate)
		) {
			router.push('/shopping-cart')
		}
	}, [checkCartItemsHaveDeliverableDate])

	useEffect(() => {
		switch (orderData?.status) {
			case 'DELIVERING':
				return setCurrentStep('DELIVERING')
			case 'COMPLETE':
				return setCurrentStep('COMPLETE')
			default:
				break
		}
	}, [orderData])

	return (
		<main>
			{orderData?._id && (
				<StyledPageContainer>
					<BreadCrumb data={breadCrumbData} />
					{/* ensure order detail case was covered or cart has some items. */}
					<MyOrderDetailsSteps
						activeTab={currentStep}
						orderData={orderData}
					/>
					{/* conditional rendering according to the order steps */}
					<StyledCheckoutContainer>
						{
							{
								['CONFIRM']: (
									<>
										<div>
											<OrderSummary
												orderData={orderData}
												mode="review"
											/>
										</div>
										<NeedHelp />
									</>
								),
								['DELIVERING']: (
									<>
										<div>
											<OrderSummary
												orderData={orderData}
												mode="review"
											/>
										</div>
									</>
								),
								['COMPLETE']: (
									<>
										<div>
											<OrderSummary
												orderData={orderData}
												mode="review"
											/>
										</div>
									</>
								),
							}[currentStep]
						}
					</StyledCheckoutContainer>
				</StyledPageContainer>
			)}
		</main>
	)
}
