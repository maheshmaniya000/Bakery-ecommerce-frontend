import { StyledCategoryFilter } from '@/components/CategoryFilter/CategoryFilter.style'

interface Props {
	onChange: (value) => void
}
const CategoryFilter = ({ onChange }: Props) => {
	function handleChange(e) {
		e.preventDefault()

		onChange(e.target.value)
	}

	return (
		<StyledCategoryFilter>
			Sort:
			<select onChange={handleChange}>
				<option value="">&nbsp;&nbsp;Best seller</option>
				<option value="name">&nbsp;&nbsp;Name A to Z</option>
				<option value="basePrice">&nbsp;&nbsp;Price low to high</option>
			</select>
		</StyledCategoryFilter>
	)
}

export default CategoryFilter
