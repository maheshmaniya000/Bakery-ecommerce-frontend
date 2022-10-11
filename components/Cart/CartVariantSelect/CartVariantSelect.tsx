import Select from 'react-select'

interface Option {
	value: any
	label: string
}

interface Props {
	options: Option[]
	// extract label and values from each object of the Options array
	optionsMatcher?: string[]
	onSelect?: (any) => void
	defaultValue?: any
}

/**
 * size select for cart item, without formik, border and label
 * @param onSelect
 * @param optionsMatcher
 * @param defaultValue
 * @param props
 * @constructor
 */
function CartVariantSelect({
	onSelect = () => null,
	optionsMatcher,
	defaultValue,
	...props
}: Props) {
	const styles = {
		control: (provided) => ({
			...provided,
			boxShadow: 'none',
			borderWidth: 0,
			minHeight: 'fit-content',
			width: '100%',
			borderRadius: '4px',
			cursor: 'pointer',
		}),
		indicatorSeparator: () => ({}),
		container: (provided) => ({
			...provided,
			width: '100%',
		}),
		valueContainer: (provided) => ({
			...provided,
			position: 'relative',
		}),
		menu: (provided) => ({
			...provided,
			width: '100%',
			zIndex: 5,
		}),
	}

	return (
		<Select
			styles={styles}
			{...props}
			onChange={onSelect}
			defaultValue={defaultValue}
			{...{
				...(optionsMatcher && {
					getOptionLabel: (option) => option[optionsMatcher[0]],
					getOptionValue: (option) => option[optionsMatcher[1]],
				}),
			}}
		/>
	)
}

export default CartVariantSelect
