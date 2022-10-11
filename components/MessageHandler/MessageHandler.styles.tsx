import styled from '@/types/styled'
import { motion } from 'framer-motion'

export const StyledMessageHandler = styled(motion.div)`
	position: fixed;
	top: 70px;
	width: 100%;
	z-index: 10000;

	.container {
		background: ${({ theme }) => theme.colors.baseFontColor};
		text-align: center;
		color: #fff;
		padding: 29px 10px;
		margin: 0 auto;
		width: 90%;
		max-width: 1440px;
	}
`
