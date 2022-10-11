import React, { useEffect, useRef } from 'react'
import { StyledPopOver } from '@/components/PopOver/PopOver.style'

interface Props {
	onClose?: () => void
	children: React.ReactNode
	style?: React.CSSProperties
}

/**
 * Just handle the event handling and placeholder for a popover
 * rendering should be done through children props
 * @param children
 * @param onClose
 * @constructor
 */
const Popover: React.FC<Props> = ({
	children,
	onClose = () => null,
	...props
}) => {
	const ele = useRef(null)

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, false)

		return () =>
			document.removeEventListener('click', handleClickOutside, false)
	}, [])

	/**
	 * listen the click event from the current DOM
	 * if there might be some click event which happened outside
	 * trigger the on close function
	 */
	function handleClickOutside(e) {
		if (!ele.current.contains(e.target)) {
			onClose()
		}
	}

	return (
		<StyledPopOver
			ref={ele}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			{...props}
		>
			{children}
		</StyledPopOver>
	)
}

export default Popover
