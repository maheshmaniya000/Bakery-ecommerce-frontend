import { motion } from 'framer-motion'

import styled from '@/types/styled'

type Props = {
	text?: string
}

export const InfoText = ({ text = '' }: Props) => {
	return (
		<Text
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<img src="/images/icons/notice.svg" />
			{text}
		</Text>
	)
}

const Text = styled(motion.div)`
	display: flex;
	align-items: center;
	padding: 5px 0;

	img {
		margin-right: 10px;
	}
`
