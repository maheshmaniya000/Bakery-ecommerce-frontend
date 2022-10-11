import { Bundle } from 'interfaces/Bundle'

import { BundleProduct } from './BundleProduct'

type Props = {
	bundle: Bundle
}

export function BundleProducts({ bundle }: Props) {
	return (
		<div
			style={{
				marginBottom: '15px',
			}}
		>
			{bundle.products.map((item) => {
				return (
					<BundleProduct
						key={item._id}
						qty={item.qty}
						product={item.product}
					/>
				)
			})}
		</div>
	)
}
