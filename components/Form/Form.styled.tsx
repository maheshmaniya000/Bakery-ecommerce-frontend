import styled from '@/types/styled'
import { motion } from 'framer-motion'

export const StyledErrorField = styled(motion.div)`
	color: ${({ theme }) => theme.colors.error};
	padding-top: 10px;
`
