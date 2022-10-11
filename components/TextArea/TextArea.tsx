import { StyledTextArea } from '@/components/TextArea/TextArea.style'
import { useField } from 'formik'

interface Props {
	maxInput?: number
	name: string
}
const TextArea = ({ maxInput = 25, name }: Props) => {
	const [field] = useField(name)

	return (
		<StyledTextArea>
			<textarea  {...field} maxLength={maxInput}/>
			<span className="count">{field?.value?.length || 0} / {maxInput}</span>
		</StyledTextArea>
	)
}

export default TextArea
