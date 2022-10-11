import styled from '@/types/styled'

export const StyledCategoryHeading = styled.section`
	display: flex;
	text-align: left;
	padding-top: 20px;

	@media (min-width: 768px) {
		justify-content: space-between;
		align-items: flex-end;
	}

	@media (max-width: 768px) {
		flex-direction: column;
	}

	.heading {
		/* padding-bottom: 10px; */
	}

	.description {
		padding-bottom: 15px;
	}
`
