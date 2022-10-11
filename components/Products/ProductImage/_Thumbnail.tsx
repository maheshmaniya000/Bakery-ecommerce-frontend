import { getCDNImage } from 'lib/getCDNImage'
import { ThumbnailContainer, ThumbnailImage } from './_styled'

type Props = {
	image: string
	isActive: boolean
	onClick: () => void
}

export const Thumbnail = ({ image, isActive, onClick }: Props) => {
	return (
		<ThumbnailContainer onClick={onClick}>
			<ThumbnailImage
				src={getCDNImage(image)}
				alt={image}
				active={isActive}
			/>
		</ThumbnailContainer>
	)
}
