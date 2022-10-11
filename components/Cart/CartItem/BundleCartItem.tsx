import { StyledCartItem } from './CartItem.style'
import { getCDNImage } from 'lib/getCDNImage'
import { Anchor } from '@/styles/elements'
import Counter from '@/components/ui/Counter/Counter'
import { priceHelper } from 'utils/helper'
import { useContext } from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { ApplicationContext } from 'context/ApplicationContext'
import { useDeliverableDates } from 'data/useDeliverableDates'

import { Bundle } from 'interfaces/Bundle'
import { BundleFormValues } from '@/components/Bundles/BundleForm/BundleFormValues'

type Props = {
	item: {
		id: string
		bundle: Bundle
		quantity: number
		values: BundleFormValues
	}
	showEarliestDate: boolean
}

export const BundleCartItem = ({ item, showEarliestDate }: Props) => {
	const { updateQtyByIds, removeByIds } = useContext(ApplicationContext)

	const { data } = useDeliverableDates({
		key: 'bundle',
		cart: showEarliestDate
			? item.bundle.products.map((_item) => ({
					productId: _item.product._id,
					variantId: _item.variant || undefined,
					qty: _item.qty * item.quantity,
			  }))
			: [],
	})

	const earliest = data.find((date) => date.valid === true)

	const handleOnRemove = () => {
		removeByIds(item.id)
	}

	const handleQtyChange = (count) => {
		updateQtyByIds(item.id, count)
	}

	return (
		<StyledCartItem>
			<img
				src={getCDNImage(item.bundle.image)}
				alt={item.bundle.name}
				className="thumbnail"
			/>

			<div className="product-info">
				<div style={{ display: 'flex' }}>
					{showEarliestDate && !earliest ? (
						<OutOfStockImage
							src="/images/icons/error.svg"
							alt="error"
						/>
					) : null}
					<h4 className="product-name">{item.bundle.name}</h4>
				</div>

				{earliest && (
					<ul className="special-product-info">
						<li>
							Earliest date is{' '}
							{moment(earliest.date).format('DD MMM YYYY')}
						</li>
					</ul>
				)}

				{item.values.products.map((item) => (
					<ul
						className="special-product-info"
						style={{
							paddingTop: '10px',
						}}
						key={item._id}
					>
						<li>
							<b>
								{item.product.name} (x{item.qty})
							</b>
						</li>
						{item.product.isSpecial ? (
							<>
								<li>
									Candles (standard size):{' '}
									{item.candles.label}
								</li>

								<li>Cake Knife: {item.knife.label}</li>
								{!item.product.isNoCakeText && (
									<li>Cake Text: {item.cakeText}</li>
								)}
							</>
						) : null}
					</ul>
				))}

				<div className="remove-link">
					<Anchor isUnderline={true} onClick={handleOnRemove}>
						Remove
					</Anchor>
				</div>
			</div>

			<div className="quantity-input">
				<Counter
					min={1}
					max={10}
					initialValue={item.quantity}
					onChange={handleQtyChange}
				/>
			</div>

			<div className="price">
				S$
				{priceHelper(item.quantity * item.bundle.price)}
			</div>
		</StyledCartItem>
	)
}

const OutOfStockImage = styled.img`
	margin-right: 12px;
`
