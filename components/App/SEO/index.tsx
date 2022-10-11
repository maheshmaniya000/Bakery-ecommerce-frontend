import { NextSeo } from 'next-seo'

const DEFAULT = {
	title: 'Online Bakehouse',
	description:
		'Baking our life story into chiffon cakes, siew dai style. Homemade, handcrafted, made with care, made from scratch. Let us be your #MessengersOfLove & send #CakesForCheer. From our family to yours.',
	url: 'https://www.Onlinebakehouse.com',
	image: '/images/Online.png',
}

interface Props {
	title?: string
	image?: string
	description?: string
	url?: string
	noIndex?: boolean
}

const AppSEO = ({ title, image, description, url, noIndex = false }: Props) => {
	return (
		<NextSeo
			title={title ? `${title} | Online Bakehouse` : DEFAULT.title}
			description={description ? description : DEFAULT.description}
			canonical={url ? url : DEFAULT.description}
			noindex={noIndex}
			openGraph={{
				url: url ? `${DEFAULT.url}${url}` : `${DEFAULT.url}/`,
				title: title ? `${title} | Online Bakehouse` : DEFAULT.title,
				description: description ? description : DEFAULT.description,
				images: [
					{
						url: image ? image : DEFAULT.image,
						width: 400,
						height: 400,
						alt: 'Online Bakehouse',
					},
				],
			}}
		/>
	)
}

export default AppSEO
