import produce from 'immer'

import { Product } from 'interfaces/Product'
import { SliceBoxCart, SliceBoxOption } from 'interfaces/SliceBox'

type STATE = {
	selectedOption?: SliceBoxOption
	cart: Array<SliceBoxCart>
}

type ACTION_TYPE =
	| {
			type: 'SET_OPTION'
			payload: SliceBoxOption | undefined
	  }
	| { type: 'SET_QTY'; payload: { product: Product; qty: number } }
	| { type: 'CLEAR' }

export const INITIAL_STATE: STATE = {
	selectedOption: null,
	cart: [],
}

export const sliceBoxReducer = produce((draft: STATE, action: ACTION_TYPE) => {
	switch (action.type) {
		case 'SET_OPTION':
			{
				draft.selectedOption = action.payload

				if (action.payload) {
					// check cart items
					const total = draft.cart.reduce(
						(acc, curr) => acc + curr.qty,
						0
					)

					if (total > action.payload.max) {
						draft.cart = []
					}
				}
			}
			break

		case 'SET_QTY':
			{
				const index = draft.cart.findIndex(
					({ product }) => product._id === action.payload.product._id
				)

				if (index > -1) {
					draft.cart[index].qty = action.payload.qty
				} else {
					draft.cart.push(action.payload)
				}
			}
			break

		case 'CLEAR':
			{
				draft.selectedOption = undefined
				draft.cart = []
			}
			break

		default:
			break
	}
})
