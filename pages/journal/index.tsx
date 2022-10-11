import AppSEO from '@/components/App/SEO'
import BlogCard from '@/components/Blogs/Card'
import { useBlogs } from 'data/useBlogs'
import styles from './index.module.scss'

const index = () => {
	const { data, loading } = useBlogs()

	return (
		<>
			<AppSEO title="Blog" />
			<div className={styles.container}>
				<h1 className={styles.title}>Journal</h1>
				{/* <p className={styles.description}>Descriptions</p> */}
				<div className={styles.content}>
					{!loading &&
						data.docs.map((item, index) => {
							return (
								<BlogCard
									key={index}
									index={index}
									data={item}
								/>
							)
						})}
				</div>
			</div>
		</>
	)
}

export default index
