import React from 'react'

import { AnimatePresence } from 'framer-motion'
import {
	StyledModal,
	StyledModalContent,
	StyledModalOverlay,
} from '@/components/Modal/Modal.style'

interface Props {
	isToggled?: boolean
	setToggle: (boolean) => void
	children: React.ReactNode
	style?: React.CSSProperties
}
export const Modal = ({ isToggled, setToggle, style, children }: Props) => {
	const handleClose = () => setToggle(false)
	return (
		<AnimatePresence>
			{isToggled && (
				<StyledModal style={style}>
					<StyledModalOverlay
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleClose}
					/>
					<StyledModalContent
						initial={{ y: 50 }}
						animate={{ y: 0 }}
						exit={{ y: 50 }}
					>
						<div onClick={handleClose} className="close-btn">
							<img src="/images/icons/close.svg" />
						</div>
						{children}
					</StyledModalContent>
				</StyledModal>
			)}
		</AnimatePresence>
	)
}
