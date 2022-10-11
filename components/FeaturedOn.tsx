import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

import { StyledContentHeading } from '@/styles/elements'
import { StyledFeaturesContainer } from '@/styles/pages/landing'
import { FadeInVariants } from 'animations/FadeInVariants'

type Props = {
	featuredOn: any[]
}

const FeaturedOn: React.FC<Props> = ({ featuredOn }) => {
	const { ref, inView } = useInView({ threshold: 0.2 })
	const controls = useAnimation()

	useEffect(() => {
		controls.start(inView ? 'show' : 'hidden')
	}, [inView])

	return (
		<StyledFeaturesContainer
			ref={ref}
			animate={controls}
			variants={FadeInVariants}
			initial="hidden"
		>
			<StyledContentHeading>Featured On</StyledContentHeading>
			<section className="grid-wrapper">
				{featuredOn.map((elem) => (
					<div
						className="item"
						key={elem.image}
						style={{
							backgroundImage: `url(${elem.image})`,
						}}
					/>
				))}
			</section>
		</StyledFeaturesContainer>
	)
}

export default FeaturedOn
