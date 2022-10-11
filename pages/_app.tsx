import App, { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/core'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'emotion-theming'
import { animateScroll as scroll } from 'react-scroll'
import * as moment from 'moment-timezone'

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion'

import { globalStyles } from '@/styles/styles'
import styled, { Theme } from '@/types/styled'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import NewsLetter from '@/components/NewsLetter'
import ModalFactory from '@/components/ModalFactory'
import MessageHandler from '@/components/MessageHandler/MessageHandler'
import ApplicationContextProvider from '../context/ApplicationContext'
import { useEffect } from 'react'
import { scrollToTop } from 'utils/helper'
import Banner from '@/components/Banner'

import * as gtag from '../lib/gtag'

function handleExitComplete() {
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0 })
	}
}

const theme: Theme = {
	colors: {
		primary: '#E7D8C3',
		secondary: '#F4F1ED',
		error: '#F44336',

		baseFontColor: '#7C7167',
		linkColor: '#7E5000',

		borderColor: '#E7D8C3',
	},

	variables: {
		maxWidth: '1140px',
	},
}

const ComponentContainer = styled.div`
	@media (max-width: 1200px) {
		margin: 0 auto;
		width: 90%;
	}
`

const HeaderMobileFiller = styled.div`
	height: 77px;
	@media (min-width: 769px) {
		display: none;
	}
`

const BannerMobileFiller = styled.div`
	height: 30px;
	@media (min-width: 769px) {
		display: none;
	}
`

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		moment.tz.setDefault('Asia/Singapore')
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
		scroll.scrollToTop()
	}, [router.asPath])

	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return (
		<CacheProvider value={cache}>
			{globalStyles(theme)}
			<AnimatePresence
				exitBeforeEnter={true}
				// onExitComplete={handleExitComplete}
			>
				<ThemeProvider theme={theme}>
					<ApplicationContextProvider>
						<Banner />
						<BannerMobileFiller />
						<Header />
						<HeaderMobileFiller />
						<ComponentContainer>
							<Component {...pageProps} key={router.route} />
						</ComponentContainer>
						<NewsLetter />
						<Footer />
						<ModalFactory />
						<MessageHandler />
					</ApplicationContextProvider>
				</ThemeProvider>
			</AnimatePresence>
		</CacheProvider>
	)
}

MyApp.getInitialProps = async (appContext) => ({
	...(await App.getInitialProps(appContext)),
})

export default MyApp
