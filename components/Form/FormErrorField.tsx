import { StyledErrorField } from '@/components/Form/Form.styled'

interface Props {
	error: string
	style?: any
}

function ErrorField({ error, style }: Props) {
	return (
		<StyledErrorField
			initial={{ x: 20, opacity: 0.8 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 20, opacity: 0 }}
			style={style}
		>
			{error}
		</StyledErrorField>
	)
}

export default ErrorField
