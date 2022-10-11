import AppSEO from '@/components/App/SEO'
import Link from 'next/link'
import services from 'services'
import styles from './index.module.scss'

const index = ({ faq }) => {
	return (
		<>
			<AppSEO title="FAQ" />
			<div className={styles.container}>
				<h1 className={styles.title}>FAQS</h1>
				<p className={styles.description}>
					We get asked these questions often, and we thought you might
					be wondering the same too! So here’s a bunch of questions
					and answers that you might find useful to kickstart ur first
					#CakesforCheer experience with us!
				</p>

				<Link href="/faq-cakecare">
					<a className={styles.linkBtn}>
						Click here for our cake care instructions
					</a>
				</Link>

				<br />

				{faq.map(({ _id, question, answer }) => (
					<details className={styles.faq__container} key={_id}>
						<summary className={styles.faq__title}>
							{question}
						</summary>
						<div
							className={styles.faq__content}
							dangerouslySetInnerHTML={{ __html: answer }}
						/>
					</details>
				))}
				<br />
				<br />
				<div className={styles.more_questions}>
					<p>
						Have more questions? Come chat us up via IG, FB DMs or
						call/ whatsapp us at +65 8891 5819
					</p>
				</div>
			</div>
		</>
	)
}

export const getStaticProps = async () => {
	const {
		data: { data: faq },
	} = await services.getFaq()
	return {
		props: {
			faq,
		},
		revalidate: 1,
	}
}

export default index
