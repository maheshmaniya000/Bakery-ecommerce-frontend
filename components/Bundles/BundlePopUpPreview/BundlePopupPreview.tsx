import { AddToCartPreview } from '@/components/AddToCartPreview/AddToCartPreview'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
	timestamp?: number
	name?: string
	image?: string
	price?: number
	qty?: number
}

export function BundlePopupPreview({
	timestamp,
	name,
	image,
	price,
	qty,
}: Props) {
	const [showPreview, setShowPreview] = useState(false)

	useEffect(() => {
		if (timestamp) setShowPreview(true)
	}, [timestamp])

	return (
		<AnimatePresence>
			{showPreview && (
				<AddToCartPreview
					name={name}
					image={image}
					price={price}
					qty={qty}
					onClose={() => setShowPreview(false)}
				/>
			)}
		</AnimatePresence>
	)
}
