import styled from '@/types/styled'
import { motion } from 'framer-motion'

export const StyledErrorHandler = styled(motion.div)(
	({ theme }) => `
	color: ${theme.colors.linkColor};
	text-align: left;
	padding: 18px;
	display: flex;
	align-items: center;
	
	border: 1px solid ${theme.colors.borderColor};
	background: ${theme.colors.secondary};

	&:not(:first-of-type) {
		margin-top: 8px;
	}
	
	.icon {
		margin-right: 10px;	
	}	
	`
)
