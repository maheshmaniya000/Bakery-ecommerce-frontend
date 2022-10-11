import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { Container } from './styled'
import { useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

type Props = {
	min: number
	max: number
	initialValue: number
	onChange: (count: number) => void
}

export default function Counter({ initialValue, min, max, onChange }: Props) {
	const counter$ = useRef(new Subject<number>())

	const [count, setCount] = useState<number>(initialValue)

	useEffect(() => {
		counter$.current.next(count)
	}, [count])

	useEffect(() => {
		const subscription = counter$.current
			.pipe(debounceTime(500))
			.subscribe(onChange)

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	function handleMinusClick() {
		if (min === count) return

		setCount(count - 1)
	}

	function handlePlusClick() {
		if (max <= count) return

		setCount(count + 1)
	}

	return (
		<Container>
			<button className="minus" type="button" onClick={handleMinusClick}>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<p className="value">{count}</p>
			<button
				className="plus"
				type="button"
				onClick={handlePlusClick}
				// disabled={inputField.value >= max}
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</Container>
	)
}
