import styled, { Theme } from '@/types/styled'

type OptionBoxProps = {
	isActive?: boolean
	theme: Theme
}

export const Container = styled.div`
	@media (min-width: 769px) {
		margin-bottom: 20px;
	}
`

export const OptionBox = styled.button(
	({ theme, isActive }: OptionBoxProps) => `
	cursor: pointer;
    background-color: ${isActive ? theme.colors.linkColor : '#80808033'};
	border: 0px;
	color: ${isActive ? 'white' : theme.colors.linkColor};
`
)

export const Image = styled.img`
	width: 100%;
	height: 40vw;
	object-fit: cover;

	@media (min-width: 768px) {
		height: 260px;
	}
`

export const Title = styled.h4(
	() => `
	text-align: left;
	padding: 10px 0px 10px 10px;
`
)
