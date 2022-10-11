import { InfoText } from '@/components/ui/InfoText/InfoText'
import { useDeliverableDates } from 'data/useDeliverableDates'
import { SliceBoxCart } from 'interfaces/SliceBox'
import moment from 'moment'
import { AnimatePresence } from 'framer-motion'
import Sticky from 'react-stickynode'
import styled from '@/types/styled'
import { useMediaQuery } from 'react-responsive'

type Props = {
	cart: SliceBoxCart[]
}

export const SliceBoxEarliestDate = ({ cart }: Props) => {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	})

	const { data } = useDeliverableDates({
		key: 'slice-box',
		cart: cart.map((_cart) => ({
			productId: _cart.product._id,
			qty: _cart.qty,
		})),
	})

	const earliest = data.find((_date) => _date.valid === true)
	const isEmpty = data.length === 0

	return (
		<Sticky enabled={isMobile && !isEmpty} top={77} innerZ={9}>
			{({ status }) => {
				return (
					<Container
						style={{
							backgroundColor:
								status === Sticky.STATUS_FIXED
									? '#E7D8C3'
									: undefined,
						}}
					>
						<AnimatePresence>
							{!isEmpty ? (
								earliest ? (
									<InfoText
										text={`Earliest delivery date is ${moment(
											earliest.date
										).format('DD-MM-YYYY')}!`}
									/>
								) : (
									<InfoText text="Out of Stock!" />
								)
							) : null}
						</AnimatePresence>
					</Container>
				)
			}}
		</Sticky>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	min-height: 30px;

	@media (min-width: 769px) {
		margin-top: 10px;
	}
`
