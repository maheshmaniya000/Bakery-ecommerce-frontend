import { useRef } from 'react'
import { useTheme } from 'emotion-theming'
import { StyledSearch } from '@/components/Search/Search.style'
import { Theme } from '@/types/styled'

interface Props {
	onClose?: () => void
	onSearch: (value) => void
	defaultValue?: string
	isDark?: boolean
}

const Search: React.FC<Props> = ({
	onClose = () => null,
	onSearch,
	defaultValue,
	isDark,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const theme: Theme = useTheme()

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
			onClose()
			onSearch(event.currentTarget.value)
		}
	}

	const handleClearSearch = (event: React.MouseEvent) => {
		event.preventDefault()
		inputRef.current.value = ''
	}

	return (
		<StyledSearch>
			<img src="/images/icons/search.svg" className="search" />
			<input
				type="text"
				placeholder="Search"
				onKeyPress={handleSearch}
				defaultValue={defaultValue}
				ref={inputRef}
				autoFocus={true}
			/>

			<span className="close" onClick={handleClearSearch}>
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.00009 11.6066L11.6067 1M11.6066 11.6066L1 1"
						stroke={isDark ? theme.colors.baseFontColor : 'white'}
					/>
				</svg>
			</span>
		</StyledSearch>
	)
}

export default Search
