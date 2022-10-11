import { useEffect, useState } from 'react'
import localforage from 'localforage'

import { Layout } from '@/components/Layout'
import { Modal } from '@/components/Modal/Modal'

import { NoticeModal } from '@/styles/pages/landing'

import { StyledBaseContainer } from '@/styles/elements'
import { HomeCarousel } from '@/components/HomeCarousel/HomeCarousel'
import services from 'services'
import OurStory from '@/components/OurStory'
import { CurrentlyTrending } from '@/components/CurrentlyTrending'
import FeaturedOn from '@/components/FeaturedOn'
import OurClients from '@/components/OurClients'

export const Home = ({
	homeCarousel,
	featuredOn,
	ourClients,
	announcements,
}): JSX.Element => {
	const popup = announcements.find(
		(announcement) =>
			announcement.type === 'POPUP' && announcement.active === true
	)

	const [showModal, toggleModal] = useState(false)

	// show the announcement popup if the stored popup is not same, else dont show
	useEffect(() => {
		;(async () => {
			if (popup) {
				const storedPopup = (await localforage.getItem('popup')) as any
				if (storedPopup?.updated !== popup.updated) {
					await localforage.setItem('popup', popup)
					toggleModal(true)
				}
			}
		})()
	}, [])

	return (
		<Layout>
			<HomeCarousel images={homeCarousel} />
			<Modal setToggle={toggleModal} isToggled={showModal}>
				<NoticeModal>
					<h3 className="heading">{popup?.header}</h3>
					<p className="description">{popup?.message}</p>
				</NoticeModal>
			</Modal>
			<main>
				<StyledBaseContainer>
					<CurrentlyTrending />

					<OurStory />

					<FeaturedOn featuredOn={featuredOn} />

					<OurClients ourClients={ourClients} />
				</StyledBaseContainer>
			</main>
		</Layout>
	)
}

export const getStaticProps = async () => {
	const [
		{
			data: { images: homeCarousel },
		},
		{
			data: { data: featuredOn },
		},
		{
			data: { data: ourClients },
		},
		{
			data: { docs: announcements },
		},
	] = await Promise.all([
		services.getHomeCarousel(),
		services.getFeaturedOn(),
		services.getOurClients(),
		services.getAnnouncements(),
	])

	return {
		props: {
			homeCarousel,
			featuredOn,
			ourClients,
			announcements,
		},
		revalidate: 1,
	}
}

export default Home
