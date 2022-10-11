import styled from '@/types/styled'

export const StyledCategoryFilter = styled.section`
	select {
		background: #ffffff;
		border: 1px solid ${({ theme }) => theme.colors.borderColor};
		border-radius: 4px;
		height: 40px;
		color: ${({ theme }) => theme.colors.linkColor};

		@media (min-width: 769px) {
			width: 260px;
			margin-left: 20px;
		}

		@media (max-width: 768px) {
			width: 100%;
			margin-top: 10px;
		}
	}
	
	@media (max-width: 768px) {
		margin: 20px 0;
	}
`
