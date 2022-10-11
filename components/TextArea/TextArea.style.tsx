import styled from '@/types/styled'

export const StyledTextArea = styled.section`
	position: relative;
	margin-top: 10px;
	textarea {
		width: 100%;
		height: 80px;
		resize: none;
		outline: none;

		background: #ffffff;
		border: ${({ theme }) => `1px solid ${theme.colors.baseFontColor}`};
		padding: 10px;
		box-sizing: border-box;
		border-radius: 4px;
	}
	
	.count {
		position: absolute;	
		bottom: 10px;
		right: 10px;	
	}		
`
