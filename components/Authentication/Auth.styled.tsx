import styled from '@/types/styled'
import { StyledButton } from '@/styles/elements'

export const StyledFormGroup = styled.div`
	margin-top: 12px;
`

export const StyledFormGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 24px;

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
	}
`

export const StyledFormDescription = styled.div`
	padding-bottom: 20px;
	text-align: center;
	font-size: 1.7rem;
	line-height: 1.8rem;
`

export const StyledFormDivider = styled.div`
	text-align: center;
	margin-top: 20px;
`

export const StyledForgotPasswordText = styled.div`
	text-align: right;
	margin-top: 10px;
`

export const StyledSubmitButton = styled(StyledButton)`
	margin-top: 30px;
	width: 100%;
	font-size: 1.5rem;
	line-height: 1.7rem;
`

export const StyledAuthFooter = styled.section`
	text-align: center;
	margin-top: 30px;
`

export const StyledSocialContainer = styled.section(
	({ theme }) => `
	.social-button-wrapper {
		text-align: center;
	}

	.social-button {
		position: relative;
		background: #ffffff;
		outline: none;
		border: 1px solid ${theme.colors.borderColor};
		color: ${theme.colors.baseFontColor};
		border-radius: 40px;
		padding: 9px 0px 9px 20px;
		font-size: 1.5rem;
		line-height: 1.6rem;
		height: 44px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 8px 10px 0;
		min-width: 160px;
	}

	.social-icon {
		width: 26px;
		height: 26px;
		position: absolute;

		&.facebook {
			left: 15px;
		}

		&.google {
			left: 25px;
		}
	}
`
)
