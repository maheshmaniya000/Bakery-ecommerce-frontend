import { StyledErrorHandler } from '@/components/ErrorHandler/ErrorHandler.style'

interface Props {
	message?: any
}

const ErrorHandler : React.FC<Props> = ({ message }) => {
	return (
		<StyledErrorHandler
			initial={{ x: 50, opacity: 0.8 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 50, opacity: 0 }}
		>
			<img src='/images/icons/error.svg' className="icon"/>
			{message}
		</StyledErrorHandler>
	)
}

export default ErrorHandler
