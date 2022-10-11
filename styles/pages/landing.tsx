import { motion } from 'framer-motion'

import styled from '@/types/styled'

export const StyledProductListingContainer = styled(motion.section)`
	.grid-wrapper {
		display: grid;
		column-gap: 10px;
		row-gap: 10px;
		grid-template-columns: repeat(2, 1fr);
		margin-top: 20px;

		@media (max-width: 425px) {
			column-gap: 20px;
		}

		@media (min-width: 789px) and (max-width: 1200px) {
			grid-template-columns: repeat(3, 1fr);
			column-gap: 33px;
			row-gap: 33px;
			margin-top: 50px;
		}
		@media (min-width: 1201px) {
			grid-template-columns: repeat(4, 1fr);
			column-gap: 33px;
			row-gap: 33px;
			margin-top: 50px;
		}
	}
`

export const StyledOurStoryContainer = styled(motion.section)`
	display: grid;
	row-gap: 30px;
	margin: 40px 0 25px;

	@media (min-width: 787px) {
		column-gap: 100px;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		margin: 60px 0;
	}

	img {
		width: 100%;
		height: auto;
	}

	.description {
		font-size: 1.6rem;
		line-height: 1.5;
		letter-spacing: 0.05em;
		margin: 15px 0;
		@media (min-width: 769px) {
			margin: 40px 0 30px;
		}
	}
`

export const StyledFeaturesContainer = styled(motion.section)`
	text-align: center;

	.grid-wrapper {
		margin-top: 50px;

		@media (max-width: 425px) {
			margin-top: 15px;
		}

		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-items: center;
		row-gap: 30px;
		gap: 15px;

		@media (min-width: 769px) {
			grid-template-columns: repeat(12, 1fr);
		}

		@media (max-width: 768px) {
			grid-template-columns: repeat(3, 1fr);
		}

		.item {
			background: #00000000 no-repeat center; // just dummy background, so we will not use color from theme
			background-size: cover;
			width: 100%;
			height: 170px;

			@media (max-width: 425px) {
				width: 280px;
				grid-column: span 3;
			}

			@media (min-width: 769px) {
				width: 170px;
				height: 170px;

				grid-column: span 3;

				/* &:nth-child(5),
				&:nth-child(7) {
					grid-column: span 5;
				} */
				/* &:nth-child(6) {
					grid-column: span 2;
				} */
			}
		}
	}
`

export const StyledClientsContainer = styled(motion.section)`
	margin: 60px 0;
	text-align: center;

	@media (max-width: 425px) {
		margin-top: 40px;
	}

	.description {
		font-size: 1.5rem;
		line-height: 1.2;
		margin: 50px auto;

		@media (max-width: 425px) {
			margin: 15px auto;
		}

		@media (min-width: 769px) {
			width: 80%;
			text-align: center;
		}
	}
`

export const NoticeModal = styled.div`
	.heading {
		font-size: 2.2rem;
		text-align: center;
	}

	.description {
		margin-top: 24px;
	}
`
