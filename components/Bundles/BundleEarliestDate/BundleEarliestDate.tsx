import { InfoText } from '@/components/ui/InfoText/InfoText'
import { useDeliverableDates } from 'data/useDeliverableDates'
import { useFormikContext } from 'formik'
import moment from 'moment'

import { Bundle } from 'interfaces/Bundle'
import { useEffect } from 'react'

type Props = {
	bundle: Bundle
}

export const BundleEarliestDate = ({ bundle }: Props) => {
	const { values, setFieldValue } = useFormikContext<any>()

	const { data } = useDeliverableDates({
		key: 'bundle',
		cart: bundle.products.map((_item) => ({
			productId: _item.product._id,
			variantId: _item.variant || undefined,
			qty: _item.qty * parseInt(values.quantity || 1),
		})),
	})

	const earliest = data.find((_date) => _date.valid === true)

	useEffect(() => {
		setFieldValue('isOutOfStock', earliest ? false : true)
	}, [earliest])

	return (
		<div
			style={{
				marginBottom: '15px',
			}}
		>
			{earliest ? (
				<InfoText
					text={`Earliest delivery date is ${moment(
						earliest.date
					).format('DD-MM-YYYY')}!`}
				/>
			) : (
				<InfoText text="Out of Stock!" />
			)}
		</div>
	)
}
