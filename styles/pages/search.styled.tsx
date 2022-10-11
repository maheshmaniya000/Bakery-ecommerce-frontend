import styled from '@/types/styled'

export const StyledSearchWrapper = styled.section`
	color: ${({ theme }) => theme.colors.linkColor};
	
	.heading {
		font-size: 1.5rem;
		line-height: 1.7rem;
		text-transform: uppercase;
		
		margin: 25px 0 15px 0;
	}	
`

export const StyledSearchResult = styled.div`
	padding-top: 30px;
`
