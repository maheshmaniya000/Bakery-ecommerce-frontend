import Product from '@/components/Product'

import { Product as IProduct } from 'interfaces/Product'
import { SliceBoxCart } from 'interfaces/SliceBox'

import { useIsSoldOut } from 'lib/hooks/useIsSoldOut'
import Counter from '@/components/ui/Counter/Counter'

type Props = {
	product: IProduct
	cart: SliceBoxCart[]
	index: number
	max: number
	onChange: (qty: number) => void
}

export const SliceBoxProduct = ({
	product,
	cart = [],
	index,
	max,
	onChange,
}: Props) => {
	const [isSoldOut] = useIsSoldOut(product)

	const qty = cart.find((item) => item.product._id === product._id)?.qty || 0

	return (
		<div>
			<Product isHref={false} productDetail={product} index={index} />

			{!isSoldOut && (
				<div
					style={{
						marginTop: '20px',
					}}
				>
					<Counter
						min={0}
						max={max + qty}
						initialValue={qty}
						onChange={onChange}
					/>
				</div>
			)}
		</div>
	)
}
