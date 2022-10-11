import styled from '@/types/styled'
import { StyledButton } from '@/styles/elements'
import { Form } from 'formik'

export const StyledPromoCodeForm = styled(Form)(
	({ theme }) => `
	display: flex;
	align-items: top;

	.input-wrapper {
		flex: 1;
		text-align: left;
	}		
	
	input {
		border: 1px solid ${theme.colors.baseFontColor};
		background: #fff;
		height: 40px;
		display: inline-flex;
		align-items: center;
		border-radius: 4px;
		outline: none;
		width: 100%;
		padding-left: 10px;
	}
`
)

export const StyledSubmitButton = styled(StyledButton)`
	width: 110px;
	height: 40px;
	min-width: auto;
	margin-left: 15px;

	&:disabled {
		background: ${({ theme }) => theme.colors.baseFontColor};
		pointer-events: none;
		cursor: not-allowed;
		color: #e7d8c3;
	}
`
