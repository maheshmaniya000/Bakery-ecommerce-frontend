import Select from 'react-select'
import { StyledSizeSelect } from '@/components/SizeSelect/SizeSelect.style'
import { useTheme } from 'emotion-theming'
import { Theme } from '@/types/styled'
import { useField } from 'formik'
import { useEffect, useState } from 'react'

interface Option {
	value: any
	label: string
}

interface Props {
	options: Option[]
	// extract label and values from each object of the Options array
	optionsMatcher?: string[]
	onSelect?: (any) => void
	selected?: any
	label?: string
	name: string
	padding?: string
	isSearchable?: boolean
	defaultSelect?: boolean // i don't understand usage of previous developer ???
}

function SizeSelect({
	label,
	name,
	onSelect = () => null,
	optionsMatcher,
	padding = '2px 8px 2px 60px',
	defaultSelect,
	...props
}: Props) {
	const { 0: field, 2: helpers } = useField(name)
	const [selectVal, setSelectVal] = useState(
		field.value || defaultSelect ? props.options[0] : null
	)

	useEffect(() => {
		if (field.value) {
			if (typeof field.value === 'object') {
				handleSelect(field.value)
			} else {
				const key = optionsMatcher?.[0] || 'value'

				setSelectVal(
					props.options.find((item) => item[key] === field.value)
				)
			}
		}
	}, [])

	const theme: Theme = useTheme()
	const styles = {
		control: (provided) => ({
			...provided,
			boxShadow: 'none',
			borderWidth: 0,
			minHeight: 'fit-content',
			width: '100%',
			border: `1px solid ${theme.colors.baseFontColor} !important`,
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
			padding,
			position: 'relative',
		}),
		menu: (provided) => ({
			...provided,
			width: '100%',
			zIndex: 5,
		}),
	}

	const handleSelect = (val) => {
		setSelectVal(val)
		onSelect(val)

		if (optionsMatcher) {
			helpers.setValue(val)
		} else {
			helpers.setValue(val.value)
		}
	}

	return (
		<StyledSizeSelect htmlFor={name}>
			<span className="label">{label}</span>
			<Select
				styles={styles}
				{...props}
				onChange={handleSelect}
				value={selectVal}
				{...{
					...(optionsMatcher && {
						getOptionLabel: (option) => option[optionsMatcher[0]],
						getOptionValue: (option) => option[optionsMatcher[1]],
					}),
				}}
			/>
		</StyledSizeSelect>
	)
}

export default SizeSelect
