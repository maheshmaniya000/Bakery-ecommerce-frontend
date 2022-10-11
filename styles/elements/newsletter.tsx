import styled from '@/types/styled'
import { baseContainerStyle } from '@/styles/helpers/base-container'

export const StyledNewsLetter = styled.section(
	({ theme }) => `
	background: ${theme.colors.borderColor};
	padding: 20px 0;
	@media (min-width: 769px) {
		padding: 50px 0;
	}
	
	.content {
		${baseContainerStyle(theme)}	
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (min-width: 901px) and (max-width: 1200px) {
			padding: 0 80px;
		}
		
		@media (max-width: 900px) {
			padding: 30px;
			text-align: center;
			flex-direction: column;		
		}

		@media (max-width: 425px) {
			padding: 0 20px;
		}

		h4 {
			margin-bottom: 8px;
		}
	}
	
	.form {
		border: 1px solid ${theme.colors.baseFontColor};
		background: white;
		border-radius: 4px;
		padding: 2px 2px 2px 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;	
		align-items: center;
		
		@media (min-width: 768px) {
			width: 409px;	
		}
		
		
		label {
			display: inline-flex;	
			width: 100%;
			font-size: 1.5rem;
			line-height: 1.2;
			align-items: center;
			flex-direction: row;
			position: relative;
			
		}
		
		.email-icon {
			margin-right: 15px;	
		}
	
		
	}
	
	.input {
		width: 85%;
		border: 0;	
		outline: none;
	}

	.status {
		margin: 0 0 0 12px;
		@media (max-width: 768px) {
			margin: 12px 0 0 0;
		}
	}
	
	h4 {
		color: ${theme.colors.linkColor};
		letter-spacing: 0.05rem;
		font-size: 1.7rem;
		line-height: 1.2;
		
		font-weight: bold;
		
		@media (max-width: 768px) {
			margin-bottom: 15px;
			width: 75%;
			margin: 0 auto 15px;
			text-align: center;
		}
	}
`
)
