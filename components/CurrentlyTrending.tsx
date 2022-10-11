import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

import { StyledContentHeading } from '@/styles/elements'
import { StyledProductListingContainer } from '@/styles/pages/landing'

import MoreItem from './MoreItem'
import { FadeInVariants } from 'animations/FadeInVariants'
import { useCurrentlyTrending } from 'data/useCurrentlyTrending'

export const CurrentlyTrending: React.FC = () => {
	const { ref, inView } = useInView({ threshold: 0.5 })
	const controls = useAnimation()

	const { data } = useCurrentlyTrending()

	useEffect(() => {
		if (inView) {
			controls.start('show')
		} else {
			controls.start('hidden')
		}
	}, [inView, controls])

	return (
		<StyledProductListingContainer
			ref={ref}
			animate={controls}
			variants={FadeInVariants}
			initial="hidden"
		>
			<StyledContentHeading
				style={{
					textAlign: 'left',
				}}
			>
				Currently Trending
			</StyledContentHeading>
			{data && <MoreItem title="" products={data} />}
		</StyledProductListingContainer>
	)
}
