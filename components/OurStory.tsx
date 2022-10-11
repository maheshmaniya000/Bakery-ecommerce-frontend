import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { StyledOurStoryContainer } from '@/styles/pages/landing'
import { StyledContentHeading } from '@/styles/elements'
import { FadeInVariants } from 'animations/FadeInVariants'
import { useOurStory } from 'data/useOurStory'

const LeftVariants = {
	hidden: {
		x: -20,
	},
	show: {
		x: 0,
		transition: {
			duration: 1,
		},
	},
}

const RightVariants = {
	hidden: {
		y: 20,
	},
	show: {
		y: 0,
		transition: {
			duration: 1,
		},
	},
}

const OurStory: React.FC = () => {
	const { data } = useOurStory()

	const controls = useAnimation()
	const { ref, inView } = useInView({
		threshold: 0.2,
	})

	useEffect(() => {
		if (inView) {
			controls.start('show')
		} else {
			controls.start('hidden')
		}
	}, [inView, controls])

	return (
		<StyledOurStoryContainer
			ref={ref}
			animate={controls}
			variants={FadeInVariants}
			initial="hidden"
		>
			<motion.figure
				variants={LeftVariants}
				animate={controls}
				initial="hidden"
			>
				<img src={data?.image} alt="our-story" />
			</motion.figure>
			<article>
				<StyledContentHeading
					style={{
						textAlign: 'left',
					}}
				>
					Our Story
				</StyledContentHeading>
				<motion.p
					className={'description'}
					animate={controls}
					variants={RightVariants}
					initial="hidden"
					dangerouslySetInnerHTML={{
						__html: data?.description,
					}}
				/>
			</article>
		</StyledOurStoryContainer>
	)
}

export default OurStory
