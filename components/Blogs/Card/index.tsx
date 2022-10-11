import { motion } from 'framer-motion'
import Link from 'next/link'
import moment from 'moment-timezone'

import styles from './index.module.scss'
import { getCDNImage } from 'lib/getCDNImage'

interface Props {
	index: number
	data: any
}

const BlogCard = ({ index, data }: Props) => {
	return (
		<Link href={`/journal/${data.slug}`}>
			<a className={styles.container}>
				<motion.div
					initial={{ y: 12 }}
					animate={{ y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<img
						src={getCDNImage(data.coverImage)}
						alt="blog"
						className={styles.image}
					/>
					<div className={styles.info}>
						<div className={styles.label}>
							{data.categories.join(', ')}
						</div>
						<h2 className={styles.title}>{data.title}</h2>

						{data.publishStartAt && (
							<time className={styles.date}>
								{moment
									.tz(data.publishStartAt, 'Asia/Singapore')
									.format('DD-MM-YYYY')}
							</time>
						)}

						<span className={styles.learn}>Learn more</span>
					</div>
				</motion.div>
			</a>
		</Link>
	)
}

export default BlogCard
