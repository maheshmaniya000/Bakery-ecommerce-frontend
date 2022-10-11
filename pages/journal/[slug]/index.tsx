import { useBlog } from 'data/useBlog'
import { useRouter } from 'next/router'
import moment from 'moment-timezone'

import styles from './index.module.scss'
import AppSEO from '@/components/App/SEO'
import { getCDNImage } from 'lib/getCDNImage'

const index = () => {
	const { query } = useRouter()

	const { data } = useBlog(query.slug.toString())

	return (
		<>
			<AppSEO title={data?.title} />
			<div className={styles.container}>
				<img
					src={getCDNImage(data?.mainImage)}
					alt="blog detail"
					className={styles.main_image}
				/>
				<div className={styles.label}>
					{data?.categories.join(', ')}
				</div>
				<h1 className={styles.title}>{data?.title}</h1>

				{data?.publishStartAt && (
					<time className={styles.date}>
						{moment
							.tz(data.publishStartAt, 'Asia/Singapore')
							.format('DD-MM-YYYY')}
						{data.publishStartTime
							? ` ${data.publishStartTime}`
							: null}
					</time>
				)}

				<div
					className={styles.content}
					dangerouslySetInnerHTML={{
						__html: data?.content,
					}}
				/>
			</div>
		</>
	)
}

export default index
