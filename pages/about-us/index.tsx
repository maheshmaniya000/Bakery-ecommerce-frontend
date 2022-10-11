import AppSEO from '@/components/App/SEO'
import { useAboutUs } from 'data/useAboutUs'

import styles from './index.module.scss'

const index = () => {
	const { data } = useAboutUs()

	return (
		<>
			<AppSEO title="About Us" />
			<div
				className={styles.container}
				dangerouslySetInnerHTML={{ __html: data }}
			></div>
		</>
	)
}

export default index
