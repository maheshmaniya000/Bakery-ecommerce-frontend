// import React, { useEffect, useState } from 'react'
import { StyledCounter } from '@/components/Counter/Counter.style'
// import { Subject } from 'rxjs'
// import { debounceTime } from 'rxjs/operators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

interface Props {
	value?: number
	min?: number
	max?: number
	// name: string
	onChange?: (count) => void
}

// const counter$ = new Subject<number>()

export const Counter = ({
	min = 0,
	max = 1000,
	value,
	onChange = () => null,
}: Props) => {
	// const [counter, setCounter] = useState(value)

	// useEffect(() => {
	// 	onChange(counter)
	// }, [counter])

	// useEffect(() => {
	// 	const sub = counter$.pipe(debounceTime(100)).subscribe(onChange)

	// 	return () => {
	// 		sub.unsubscribe()
	// 	}
	// }, [])

	// function handleChange(evt: React.FormEvent<HTMLInputElement>) {
	// 	handleCounterChange(parseInt(evt.currentTarget.value))
	// }

	function handleReduceChange() {
		if (value <= min) {
			return
		}

		const count = value - 1

		onChange(count)

		// counter$.next(count)
	}

	function handleAddChange() {
		if (value >= max) {
			return
		}

		const count = value + 1

		onChange(count)

		// counter$.next(count)
	}

	// function handleCounterChange(count) {
	// 	if (inputField.value === 0) {

	// 	}
	// 	helpers.setValue(count)

	// 	counter$.next(count)
	// }
	return (
		<StyledCounter>
			<button
				className="minus"
				type="button"
				onClick={handleReduceChange}
			>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<p className="value">{value}</p>
			<button
				className="plus"
				type="button"
				onClick={handleAddChange}
				// disabled={inputField.value >= max}
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</StyledCounter>
	)
}
