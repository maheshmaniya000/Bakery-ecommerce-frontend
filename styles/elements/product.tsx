import styled from '@/types/styled'
import { motion } from 'framer-motion'

export const StyledProduct = styled(motion.div)(
	({ theme }) => `
		margin-top: 12px;
		color: ${theme.colors.linkColor}
		text-align: center;
		position: relative;
	
		img {
			width: 100%;
			height: auto;	
		}	
		
		p, .title {
			text-align: left;
		}
		
		.title {
			font-weight: normal;
			font-size: 1.6rem;
			padding: 15px 0 10px;
			@media (min-width: 769px) {
				padding: 30px 0 10px;
			}
			margin: 0;
		}

		p {
			font-size: 1.5rem;
		}
	`
)
