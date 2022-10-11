import styled from '@/types/styled'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)(
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

export const OutOfStockContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 260px;
	width: 260px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(219, 203, 173, 0.363);

	@media (max-width: 768px) {
		height: 40vw;
		width: 40vw;
	}
`

export const OutOfStock = styled.div`
	width: 80px;
	height: 80px;
	background: #7e5000;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	text-align: center;
`

export const Image = styled.img`
	height: 260px !important;
	width: 260px !important;
	object-fit: cover;

	@media (max-width: 768px) {
		height: 40vw !important;
		width: 40vw !important;
	}

	@media (max-width: 425px) {
		width: 100% !important;
	}
`
