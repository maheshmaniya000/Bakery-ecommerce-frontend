import { StyledButton } from '@/styles/elements'
import styled from '@/types/styled'

export const BtnWrapper = styled.div`
	width: 100%;
	height: 95px;
	padding: 0 40px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	position: fixed;
	left: 0;
	bottom: 25px;
	z-index: 99;

	@media (min-width: 769px) {
		width: 320px;
		height: fit-content;
		position: static;
		padding: 0;

		flex-direction: row;
		align-items: center;
	}
`

export const DesktopBtnsWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	width: 350px;
	margin-top: 20px;
`

export const Button = styled(StyledButton)(
	({ theme }) => `
	border: 1px solid ${theme.colors.borderColor};

	&:disabled {
		border-color: ${theme.colors.linkColor};
	}
`
)

export const AddToCart = styled(Button)`
	justify-content: space-between;
`
