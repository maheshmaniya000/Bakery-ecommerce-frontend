import { StyledProductListingContainer } from '@/styles/pages/landing'
import useProductsByCategory from 'data/useProductsByCategory'
import { SliceBoxOption } from 'interfaces/SliceBox'
import { getCDNImage } from 'lib/getCDNImage'
import Link from 'next/link'

import * as el from './styled'
import { Anchor } from '@/styles/elements'

type Props = {
	selectedOptionBox?: SliceBoxOption
	options: SliceBoxOption[]
	onSelect: (option: SliceBoxOption) => void
}

export const SliceBoxOptionList = ({
	options,
	selectedOptionBox,
	onSelect,
}: Props) => {
	const { data: sets } = useProductsByCategory({
		slug: 'hard-code-slice-box',
	})

	return (
		<el.Container>
			<StyledProductListingContainer>
				<section
					className="grid-wrapper"
					style={{
						marginTop: '20px',
					}}
				>
					{options.map((option) => {
						return (
							<el.OptionBox
								type="button"
								key={option._id}
								isActive={option._id === selectedOptionBox?._id}
								onClick={() => onSelect(option)}
							>
								<el.Image
									src={getCDNImage(option.image)}
									alt={option.name}
								/>
								<el.Title>{option.name}</el.Title>
							</el.OptionBox>
						)
					})}

					{sets.map((product) => (
						<Link
							href={`/products/${product.slug}`}
							key={product._id}
							passHref
						>
							<Anchor>
								<el.OptionBox type="button" isActive={false}>
									<el.Image
										src={getCDNImage(product.mainImage)}
										alt={product.name}
									/>
									<el.Title>{product.name}</el.Title>
								</el.OptionBox>
							</Anchor>
						</Link>
					))}
				</section>
			</StyledProductListingContainer>
		</el.Container>
	)
}
