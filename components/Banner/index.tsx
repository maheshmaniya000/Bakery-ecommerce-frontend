import useSWR from 'swr'
import { fetcher } from 'utils/fetcher'
import { Container } from './styles'

const Banner = () => {
	const { data } = useSWR(
		process.env.NEXT_PUBLIC_API_URL + '/announcements',
		fetcher
	)
	const banner = (data?.docs || []).find(
		(doc) => doc.type === 'BANNER' && doc.active === true
	)

	return <>{banner && <Container>{banner.message}</Container>}</>
}

export default Banner
