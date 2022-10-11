import { FunctionComponent } from 'react'
import styles from './index.module.scss'

interface Props {
	title?: string
}

const SiteInfo: FunctionComponent<Props> = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default SiteInfo
