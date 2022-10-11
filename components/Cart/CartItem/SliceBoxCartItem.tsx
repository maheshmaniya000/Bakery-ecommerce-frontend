import { StyledCartItem } from './CartItem.style'
import { SliceBoxOption } from '../../../interfaces/SliceBox'
import { getCDNImage } from 'lib/getCDNImage'
import { Anchor } from '@/styles/elements'
import { Product } from 'interfaces/Product'
import Counter from '@/components/ui/Counter/Counter'
import { priceHelper } from 'utils/helper'
import { useContext } from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { ApplicationContext } from 'context/ApplicationContext'
import { useDeliverableDates } from 'data/useDeliverableDates'

type Props = {
	item: {
		id: string
		option: SliceBoxOption
		quantity: number
		products: Array<{
			product: Product
			qty: number
		}>
	}
	showEarliestDate: boolean
}

export const SliceBoxCartItem = ({ item, showEarliestDate }: Props) => {
	const { updateQtyByIds, removeByIds } = useContext(ApplicationContext)

	const { data } = useDeliverableDates({
		key: 'slice-box',
		cart: showEarliestDate
			? item.products.map((_item) => ({
					productId: _item.product._id,
					qty: _item.qty * item.quantity,
			  }))
			: [],
	})

	const earliest = data.find((date) => date.valid === true)

	const subtotal = item.products.reduce(
		(acc, curr) => acc + curr.qty * curr.product.price,
		0
	)

	const handleOnRemove = () => {
		removeByIds(item.id)
	}

	const handleQtyChange = (count) => {
		updateQtyByIds(item.id, count)
	}

	return (
		<StyledCartItem>
			<img
				src={getCDNImage(item.option.image)}
				alt={item.option.name}
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
					<h4 className="product-name">{item.option.name}</h4>
				</div>

				{earliest && (
					<ul className="special-product-info">
						<li>
							Earliest date is{' '}
							{moment(earliest.date).format('DD MMM YYYY')}
						</li>
					</ul>
				)}

				<ul className="special-product-info">
					{item.products.map((_item) => (
						<li key={_item.product._id}>
							{_item.qty}&nbsp;{_item.product.name}
						</li>
					))}
				</ul>

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
				{priceHelper(item.quantity * subtotal)}
			</div>
		</StyledCartItem>
	)
}

const OutOfStockImage = styled.img`
	margin-right: 12px;
`
