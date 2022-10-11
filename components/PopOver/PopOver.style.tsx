import { motion } from 'framer-motion'

import styled from '@/types/styled'

export const StyledPopOver = styled(motion.div)(`
	position: fixed;
	z-index: 1000;
	top: 120px;
	
	min-width: 120px;
	min-height: 120px;

	@media (max-width: 768px) {
		position: fixed;
	}
`)
