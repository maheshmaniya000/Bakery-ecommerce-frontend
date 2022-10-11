import * as React from 'react'
import Link from 'next/link'

import { Anchor } from '@/styles/elements'
import styled from '@emotion/styled'

const Container = styled.span`
	margin-left: 4px;
	display: inline-block;
	&:first-of-type {
		margin-left: 0;
	}
`

const StyledAnchor = styled(Anchor)`
	display: inline-block;
`

interface DetailProps {
	label: string
	url?: string
}

interface Props {
	data?: DetailProps[]
}

export const BreadCrumb = ({ data = [] }: Props) => {
	return (
		<div style={{ textTransform: 'capitalize' }}>
			{data.map((item, key) =>
				item.url ? (
					<Container key={key}>
						<Link href={item.url}>
							<StyledAnchor>
								{item.label?.replace(/-/g, ' ')}{' '}
								{key !== data.length - 1 ? '>' : ''}{' '}
							</StyledAnchor>
						</Link>
					</Container>
				) : (
					<span key={key}>
						{' '}
						{item.label?.replace(/-/g, ' ')}{' '}
						{key !== data.length - 1 ? '>' : ''}{' '}
					</span>
				)
			)}
		</div>
	)
}
