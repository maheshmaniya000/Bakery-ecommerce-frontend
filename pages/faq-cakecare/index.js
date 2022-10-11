import AppSEO from '@/components/App/SEO'
import services from 'services'
import styles from './index.module.scss'

const index = ({ faq }) => {
	return (
		<>
			<AppSEO title="FAQ Cakecare" />
			<div className={styles.container}>
				<h1 className={styles.title}>Cake care instructions</h1>
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
	} = await services.getFaqCakecare()
	return {
		props: {
			faq,
		},
		revalidate: 1,
	}
}

export default index
