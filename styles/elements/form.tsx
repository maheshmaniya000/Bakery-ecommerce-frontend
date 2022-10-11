import styled from '@/types/styled'
import { Field } from 'formik'
import { clickEfxStyles } from '@/styles/helpers/click-efx'

export const StyledField = styled(Field)(
	({ theme }) => `
	${clickEfxStyles}
	
	background: #FFF;
	border: 1px solid ${theme.colors.borderColor};
	border-radius: 4px;
	padding: 16px 10px;
	font-size: 1.5rem;
	line-height: 1.6rem;
	width: 100%;
	outline: none;
	margin-bottom: 4px;
	height: 50px;
`
)

export const StyledInput = styled.input(
	({ theme }) => `
	${clickEfxStyles}
	
	background: #FFF;
	border: 1px solid ${theme.colors.borderColor};
	border-radius: 4px;
	padding: 16px 10px;
	font-size: 1.5rem;
	line-height: 1.6rem;
	width: 100%;
	outline: none;
	margin-bottom: 4px;
	height: 50px;
`
)

export const StyledTextArea = styled(Field)`
	border: 0;
	background: #fff;
	font-size: 1.5rem;
	line-height: 1.6rem;
	width: 100%;
	overflow: auto;
	outline: none;
	resize: none;
	height: 80px;
	width: 100%;
`

export const StyledPureTextArea = styled.textarea`
	border: 0;
	background: #fff;
	font-size: 1.5rem;
	line-height: 1.6rem;
	width: 100%;
	overflow: auto;
	outline: none;
	resize: none;
	height: 80px;
	width: 100%;
`
