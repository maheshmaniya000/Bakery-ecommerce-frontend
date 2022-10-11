import styled from '@/types/styled'

export const Container = styled.div`
	margin: 15px 0;
`

export const Title = styled.p(
	({ theme }) => `
	font-weight: bold;
	color: ${theme.colors.linkColor};
`
)

export const Qty = styled.p(
	({ theme }) => `
	font-weight: bold;
	color: ${theme.colors.linkColor};
`
)

export const TitleContainer = styled.div`
	display: flex;
`

export const SpecialInfo = styled.ul`
	padding-top: 10px;
	list-style: none;

	li {
		font-size: 1.5rem;
		line-height: 2rem;
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0px;
		}
	}
`

export const Slider = styled.div(
	({ theme }) => `
	height: 15px;
	border-bottom: 1px solid ${theme.colors.borderColor}
`
)
