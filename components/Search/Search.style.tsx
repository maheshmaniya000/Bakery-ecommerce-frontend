import styled from '@/types/styled'

export const StyledSearch = styled.div(({theme}) => `
	width: 100%;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	
	input {
		background: #fff;
		height: 44px;
		display: inline-flex;
		width: auto;
		flex: 1;
		align-items: center;
		border-radius: 4px;
		border: 0;
		padding-left: 45px;
		padding-right: 10px;
		outline: none;
		border: 1px solid ${theme.colors.borderColor };
	}
	
	.search {
		position: absolute;	
		left: 15px;
	}
	
	.close {
		margin-left: 20px;
	}	
`)