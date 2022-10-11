import { AnimatePresence } from 'framer-motion'
import { StyledMessageHandler } from './MessageHandler.styles'
import { useContext, useEffect } from 'react'
import { ApplicationContext } from '../../context/ApplicationContext'

const MessageHandler = () => {
	const { message, setMessage, messageType, setMessageType } = useContext(
		ApplicationContext
	)

	useEffect(() => {
		let clearMessage
		if (message) {
			clearMessage = setTimeout(() => {
				setMessage('')
				setMessageType('INFO')
			}, 1200)
		}
		return () => {
			clearTimeout(clearMessage)
		}
	}, [message])

	return (
		<AnimatePresence>
			{message && (
				<StyledMessageHandler
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
				>
					<div className={`container ${messageType}`}>{message}</div>
				</StyledMessageHandler>
			)}
		</AnimatePresence>
	)
}

export default MessageHandler
