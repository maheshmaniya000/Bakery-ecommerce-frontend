import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import { ApplicationContext } from '../../context/ApplicationContext'
import {
	StyledShoppingCartFooter,
	StyledShoppingCartContentContainer,
	StyledEmptyShoppingCart,
} from '@/styles/pages/shopping-cart.style'
import { StyledContentHeading } from '@/styles/elements'
import { StyledPageContainer } from '@/styles/elements/container'
import { StyledPageHeading } from '@/styles/elements/typography'
import { Anchor, StyledButton } from '@/styles/elements'
import CartSummary from '@/components/Cart/CartSummary/CartSummary'
import CartItem from '@/components/Cart/CartItem/CartItem'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler'
import { Layout } from '@/components/Layout'
import { StyledProductListingContainer } from '@/styles/pages/landing'
import MoreItem from '@/components/MoreItem'
import { usePopularItems } from 'data/usePopularItems'
import { SliceBoxCartItem } from '@/components/Cart/CartItem/SliceBoxCartItem'
import { BundleCartItem } from '@/components/Cart/CartItem/BundleCartItem'

const ShoppingCart = (): JSX.Element => {
	const [showMinAmount, setShowMinAmount] = useState(false)
	const [showDeliveryError, setShowDeliveryError] = useState(false)
	const { checkCartItemsHaveDeliverableDate, cart, summary } =
		useContext(ApplicationContext)

	const { data: items } = usePopularItems()

	useEffect(() => {
		if (
			cart?.length > 0 &&
			summary.productsAmount &&
			summary.productsAmount
		) {
			if (summary.productsAmount < summary.minAmountCart) {
				setShowMinAmount(true)
			} else {
				setShowMinAmount(false)
			}
		}
	}, [cart, summary])

	useEffect(() => {
		if (cart?.length > 0 && !checkCartItemsHaveDeliverableDate) {
			setShowDeliveryError(true)
		} else {
			setShowDeliveryError(false)
		}
	}, [cart, checkCartItemsHaveDeliverableDate])

	return (
		<main>
			<Layout>
				<StyledPageContainer>
					{showDeliveryError && cart?.length > 1 && (
						<ErrorHandler message="There is no common delivery date for your items due to stock availability. Please remove one to proceed." />
					)}
					{showDeliveryError && cart?.length === 1 && (
						<ErrorHandler message="There is no stock availability." />
					)}
					{showMinAmount && (
						<ErrorHandler
							message={`Minimum amount to checkout is $${summary.minAmountCart}`}
						/>
					)}

					<StyledPageHeading size="1.6rem">
						Shopping Cart
					</StyledPageHeading>

					{cart.length > 0 ? (
						<StyledShoppingCartContentContainer>
							<div>
								{cart
									.filter((item) => item.type === undefined)
									.map((item) => (
										<CartItem
											showEarliestDate={
												showDeliveryError &&
												cart?.length > 1
											}
											product={item}
											key={item.product_id}
										/>
									))}

								{cart
									.filter((item) => item.type === 'slice-box')
									.map((item) => (
										<SliceBoxCartItem
											showEarliestDate={
												showDeliveryError &&
												cart?.length > 1
											}
											item={item}
											key={item.id}
										/>
									))}
								{cart
									.filter((item) => item.type === 'bundle')
									.map((item) => (
										<BundleCartItem
											showEarliestDate={
												showDeliveryError &&
												cart?.length > 1
											}
											item={item}
											key={item.id}
										/>
									))}
								<StyledShoppingCartFooter>
									<div>
										{cart
											.map((i) => i.quantity)
											.reduce(
												(acc, curr) => acc + curr,
												0
											)}{' '}
										item
										{cart
											.map((i) => i.quantity)
											.reduce(
												(acc, curr) => acc + curr,
												0
											) > 1 && 's'}
									</div>
									<div>
										<Link href="/">
											<Anchor isUnderline={true}>
												Continue Shopping
											</Anchor>
										</Link>
									</div>
								</StyledShoppingCartFooter>
							</div>

							<CartSummary />
						</StyledShoppingCartContentContainer>
					) : (
						<StyledEmptyShoppingCart>
							<div className="content">
								Your shopping cart is Empty!
							</div>
							<Link href="/">
								<StyledButton>Continue Shopping</StyledButton>
							</Link>
						</StyledEmptyShoppingCart>
					)}

					{items && (
						<StyledProductListingContainer
							style={{
								marginTop: '40px',
							}}
						>
							<StyledContentHeading
								style={{
									fontSize: '16px',
									textAlign: 'left',
									textTransform: 'none',
								}}
							>
								Popular Items
							</StyledContentHeading>
							<MoreItem title="" products={items} />
						</StyledProductListingContainer>
					)}
				</StyledPageContainer>
			</Layout>
		</main>
	)
}

export default ShoppingCart
