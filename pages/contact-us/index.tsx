import ContactUsForm from '@/components/ContactUs/ContactUsForm'
import { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import AppSEO from '@/components/App/SEO'

import { create } from '../../services/contact_us'
import { ApplicationContext } from 'context/ApplicationContext'

const ContactUsMap = dynamic(() => import('@/components/ContactUs/Map'))

const index = () => {
	const { setMessage } = useContext(ApplicationContext)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	function handleSubmit(values, helpers) {
		create(values).then(() => {
			setMessage('Your message is sent!')

			helpers.resetForm()
		})
	}

	return (
		<>
			<AppSEO title="Contact Us" />
			<Head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
					integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
					crossOrigin=""
				/>
			</Head>
			<div className={styles.container}>
				<h1 className={styles.title}>Contact us</h1>
				<p
					style={{
						fontSize: '1.6rem',
						lineHeight: '2rem',
					}}
				>
					We&apos;d love to hear from you! We want to better
					ourselves, and you are the best person to help us, so we can
					continue to delight you and your loved ones and celebrate
					more precious moments with you.
				</p>

				<div className={styles.content}>
					<div className={styles.map}>
						{isLoaded && <ContactUsMap />}
					</div>
					<div>
						<h2 className={styles.sub_title}>Online Bakehouse</h2>
						<div className={styles.info}>
							<img
								src="/images/icons/location.svg"
								alt="location"
								className={styles.icon}
							/>
							<span className={styles.text__1}>
								301 Joo Chiat Rd Singapore
								427552
							</span>
						</div>
						<div className={styles.info}>
							<img
								src="/images/icons/phone.svg"
								alt="location"
								className={styles.icon}
							/>
							<span className={styles.text__1}>
								<a
									href="tel:+65 8891 5819"
									target="__blank"
									rel="noopener noreferrer"
								>
									Calls/ Whatsapp: +65 8891 5819
								</a>
							</span>
						</div>
						<div className={styles.info}>
							<img
								src="/images/icons/email-filled.svg"
								alt="location"
								className={styles.icon}
							/>
							<span className={styles.text__1}>
								<a
									href="mailto:hello@Onlinebakehouse.com"
									target="__blank"
									rel="noopener noreferrer"
								>
									hello@Onlinebakehouse.com
								</a>
							</span>
						</div>
						<p className={styles.pickup}>Operating Hours:</p>
						<p className={styles.delivery}>
							Open daily 9am - 4pm except Mondays
						</p>
						<p className={styles.delivery}>
							Closed on Public Holidays
						</p>
						<p className={styles.delivery}>
							Collection/ Pick-up timing: 9am - 4pm
						</p>
						<p className={styles.delivery}>
							Flexi-time delivery: 11am - 7pm.
						</p>
					</div>
				</div>

				<ContactUsForm onSubmit={handleSubmit} />
			</div>
		</>
	)
}

export default index
