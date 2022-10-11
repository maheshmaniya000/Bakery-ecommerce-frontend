import { AddToCartPreview } from '@/components/AddToCartPreview/AddToCartPreview'
import { BreadCrumb } from '@/components/BreadCrumb/BreadBrumb'
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter'
import { Layout } from '@/components/Layout'
import { SliceBoxEarliestDate } from '@/components/SliceBox/SliceBoxEarliestDate/SliceBoxEarliestDate'
import { SliceBoxButtons } from '@/components/SliceBox/SliceBoxButtons/SliceBoxButtons'
import { SliceBoxOptionList } from '@/components/SliceBoxOptionList'
import { SliceBoxProduct } from '@/components/SliceBoxProduct'
import { StyledPageContainer } from '@/styles/elements/container'
import { HeaderInfoContainer } from '@/styles/elements/HeaderInfoContainer'
import { StyledPageHeading } from '@/styles/elements/typography'
import { StyledCategoryHeading } from '@/styles/pages/category-detail'
import { StyledProductListingContainer } from '@/styles/pages/landing'
import { ApplicationContext } from 'context/ApplicationContext'
import useProductsByCategory from 'data/useProductsByCategory'
import { useSliceBoxOptions } from 'data/useSliceBoxOptions'
import { AnimatePresence } from 'framer-motion'
import { Product } from 'interfaces/Product'
import { SliceBoxOption } from 'interfaces/SliceBox'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { sliceBoxReducer, INITIAL_STATE } from 'reducers/sliceBoxReducer'
import { Element, scroller } from 'react-scroll'

export const SliceBoxPage = () => {
	const [sortBy, setSortBy] = useState('')
	const [showPreview, setShowPreview] = useState(false)

	const [state, dispatch] = useReducer(sliceBoxReducer, INITIAL_STATE)

	const router = useRouter()

	const { addSliceBoxToCart } = useContext(ApplicationContext)
	const { data: options } = useSliceBoxOptions()
	const { data: products } = useProductsByCategory({
		slug: 'slice-box',
		sort: sortBy,
	})

	const total = state.cart.reduce((acc, curr) => acc + curr.qty, 0)

	useEffect(() => {
		if (state.selectedOption) {
			scroller.scrollTo('step-2', {
				offset: -100,
				duration: 800,
				delay: 0,
				smooth: 'easeInOutQuart',
			})
		}
	}, [state.selectedOption])

	const getRemainingSlots = () => {
		if (!state.selectedOption) return 0

		return state.selectedOption.max - total
	}

	const addToCart = () => {
		setShowPreview(true)

		addSliceBoxToCart(
			state.selectedOption,
			state.cart.filter((item) => item.qty > 0)
		)
	}

	const handleQtyChange = useCallback((qty: number, product: Product) => {
		dispatch({ type: 'SET_QTY', payload: { qty, product } })
	}, [])

	const handleOptionSelect = useCallback(
		(option: SliceBoxOption) => {
			if (total > option.max) {
				// force rerender
				dispatch({ type: 'SET_OPTION', payload: undefined })

				setTimeout(() => {
					dispatch({ type: 'SET_OPTION', payload: option })
				}, 100)
			} else {
				dispatch({ type: 'SET_OPTION', payload: option })
			}
		},
		[total]
	)

	const addToCartFn = () => {
		const option = state.selectedOption

		addToCart()

		setTimeout(() => {
			dispatch({ type: 'CLEAR' })

			dispatch({ type: 'SET_OPTION', payload: option })
		}, 3000)
	}

	const handleBuyNowClick = () => {
		addToCartFn()

		router.push('/shopping-cart')
	}

	const handleAddToCartClick = () => {
		addToCartFn()
	}

	return (
		<Layout>
			<main>
				<AnimatePresence>
					{showPreview && state.selectedOption ? (
						<AddToCartPreview
							name={state.selectedOption.name}
							image={state.selectedOption.image}
							price={state.cart.reduce(
								(acc, curr) =>
									acc + curr.product.price * curr.qty,
								0
							)}
							onClose={() => setShowPreview(false)}
						/>
					) : null}
				</AnimatePresence>

				<StyledPageContainer>
					<BreadCrumb
						data={[
							{
								label: 'Home',
								url: '/',
							},
							{
								label: 'Sliced Cakes',
								url: null,
							},
						]}
					/>

					<div>
						<StyledPageHeading size="1.6rem" className="heading">
							Step 1: Select box size
						</StyledPageHeading>

						<SliceBoxOptionList
							options={options || []}
							selectedOptionBox={state.selectedOption}
							onSelect={handleOptionSelect}
						/>

						{state.selectedOption && (
							<StyledCategoryHeading
								style={{
									paddingTop: '0px',
								}}
								id="slice-box-step-2"
							>
								<Element
									name="step-2"
									style={{
										flex: 1,
									}}
								>
									<HeaderInfoContainer>
										<StyledPageHeading
											size="1.6rem"
											className="heading"
										>
											Step 2: Select sliced cake flavours
										</StyledPageHeading>
									</HeaderInfoContainer>
								</Element>
								<CategoryFilter onChange={setSortBy} />
							</StyledCategoryHeading>
						)}

						<SliceBoxEarliestDate cart={state.cart} />

						{state.selectedOption && (
							<StyledProductListingContainer>
								<section
									className="grid-wrapper"
									style={{
										marginTop: '0px',
									}}
								>
									{products.map((_product, index) => {
										return (
											<SliceBoxProduct
												key={_product._id}
												product={_product}
												cart={state.cart}
												index={index}
												max={getRemainingSlots()}
												onChange={(qty) => {
													handleQtyChange(
														qty,
														_product
													)
												}}
											/>
										)
									})}
								</section>
							</StyledProductListingContainer>
						)}

						{state.selectedOption && (
							<SliceBoxButtons
								selected={total}
								maximum={state.selectedOption.max}
								isDisabled={total < state.selectedOption.min}
								onAddToCartClick={handleAddToCartClick}
								onBuyNowClick={handleBuyNowClick}
							/>
						)}
					</div>
				</StyledPageContainer>
			</main>
		</Layout>
	)
}

export default SliceBoxPage
