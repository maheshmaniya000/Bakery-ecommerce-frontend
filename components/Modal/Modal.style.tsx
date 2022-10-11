import { motion } from 'framer-motion'

import styled from '@/types/styled'
import { clickEfxStyles } from '@/styles/helpers/click-efx'

export const StyledModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: auto;
`

export const StyledModalOverlay = styled(motion.div)`
	background: rgba(120, 120, 120, 0.8);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
`

export const StyledModalContent = styled(motion.section)(
	({ theme }) => `
	background: ${theme.colors.secondary};
	border-radius: 4px;
	max-width: 560px;
	width: 90%;
	position: relative;
	padding: 50px; 
	z-index: 2;
	
	.close-btn {
		${clickEfxStyles}	
		
		position: absolute;
		top: 20px;
		right: 40px;
	}	
`
)

export const StyledModalDescription = styled.div`
	margin: 30px 0 50px 0;
`
