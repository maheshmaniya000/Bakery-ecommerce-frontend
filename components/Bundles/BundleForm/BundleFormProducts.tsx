import { FieldArray, useFormikContext } from 'formik'

import {
	Container,
	TitleContainer,
	Title,
	Qty,
	Divider,
	SpecialInfo,
} from './styles/BundleFormProducts.styles'

import { BundleFormValues } from './BundleFormValues'

import { StyledEditImage } from '@/components/Cart/CartItem/CartItem.style'
import { AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/Modal/Modal'
import { useState } from 'react'
import { BundleFormSpecials, FormValues } from './BundleFormSpecials'

export function BundleFormProducts() {
	const [showModal, toggleModal] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(0)

	const { values, setFieldValue } = useFormikContext<BundleFormValues>()

	function handleEditBtnClick(index) {
		setSelectedIndex(index)
		toggleModal(true)
	}

	function handleOnSubmit(values: FormValues) {
		setFieldValue(`products[${selectedIndex}].candles`, values.candles)
		setFieldValue(`products[${selectedIndex}].knife`, values.knife)
		setFieldValue(`products[${selectedIndex}].cakeText`, values.cakeText)

		toggleModal(false)
	}

	return (
		<>
			<FieldArray
				name="products"
				render={() => {
					return (
						<>
							{values.products.map((item, index) => {
								const variant = item.variant
									? item.product.variants.find(
											(varaint) =>
												varaint._id === item.variant
									  )
									: ''

								return (
									<Container key={item._id}>
										<TitleContainer>
											<Title style={{ flex: 1 }}>
												{item.product.name}{' '}
												{variant
													? `(${variant.size})`
													: null}
											</Title>
											<Qty>x {item.qty}</Qty>
										</TitleContainer>

										{item.product.isSpecial && (
											<SpecialInfo>
												<li>
													Candles (standard size):{' '}
													{item.candles.label}
												</li>
												<li>
													Cake Knife:{' '}
													{item.knife.label}
												</li>
												{!item.product.isNoCakeText && (
													<li>
														Cake Text:{' '}
														{item.cakeText}
													</li>
												)}
												<li>
													Edit{' '}
													<StyledEditImage
														src="/images/icons/edit-icon.svg"
														onClick={() =>
															handleEditBtnClick(
																index
															)
														}
													/>
												</li>
											</SpecialInfo>
										)}

										<Divider />
									</Container>
								)
							})}
						</>
					)
				}}
			/>

			<AnimatePresence>
				<Modal setToggle={toggleModal} isToggled={showModal}>
					{selectedIndex > -1 && (
						<BundleFormSpecials
							initialValues={{
								...values.products[selectedIndex],
							}}
							isNoCakeText={
								values.products[selectedIndex].product
									.isNoCakeText
							}
							onSubmit={handleOnSubmit}
						/>
					)}
				</Modal>
			</AnimatePresence>
		</>
	)
}
