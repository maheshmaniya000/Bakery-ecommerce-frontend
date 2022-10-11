import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

import { StyledContentHeading } from '@/styles/elements'
import { StyledClientsContainer } from '@/styles/pages/landing'

import ClientCarousel from './ClientsCarousel'
import { FadeInVariants } from 'animations/FadeInVariants'

type Props = {
	ourClients: any[]
}

const OurClients: React.FC<Props> = ({ ourClients }) => {
	const { ref, inView } = useInView({ threshold: 0.5 })
	const controls = useAnimation()

	const [clientTestimonial, setClientTestimonial] = useState<string>(
		ourClients?.length ? ourClients[0].testimonial : ''
	)

	useEffect(() => {
		controls.start(inView ? 'show' : 'hidden')
	}, [inView])

	return (
		<StyledClientsContainer
			ref={ref}
			animate={controls}
			variants={FadeInVariants}
			initial="hidden"
		>
			<StyledContentHeading>Our Clients</StyledContentHeading>
			<p className="description">{clientTestimonial}</p>

			<ClientCarousel
				clients={ourClients}
				onClick={(testimonial) => setClientTestimonial(testimonial)}
			/>
		</StyledClientsContainer>
	)
}

export default OurClients
