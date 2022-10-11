import { InfoText } from '@/components/ui/InfoText/InfoText'
import { useDeliverableDates } from 'data/useDeliverableDates'
import { useFormikContext } from 'formik'
import moment from 'moment'
import { useEffect } from 'react'

import { BundleFormValues } from './BundleFormValues'

export const BundleFormEarliestDate = () => {
	const { values, setFieldValue } = useFormikContext<BundleFormValues>()

	const { data } = useDeliverableDates({
		key: 'bundle',
		cart: values.products.map((_item) => ({
			productId: _item.product._id,
			variantId: _item.variant || undefined,
			qty: _item.qty * values.quantity,
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
