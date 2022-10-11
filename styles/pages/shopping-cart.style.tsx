import styled from '@/types/styled'

export const StyledShoppingCartContentContainer = styled.div`
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: 1fr 340px;
		column-gap: 100px;
		margin-top: 14px;
		grid-auto-rows: auto;
	}
`

export const StyledShoppingCartFooter = styled.div`
	padding-top: 10px;
	border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
	color: ${({ theme }) => theme.colors.linkColor};
	font-weight: bold;

	display: flex;
	justify-content: space-between;
`

export const StyledEmptyShoppingCart = styled.div`
	margin-top: 20px;
	border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
	padding-top: 20px;
	text-align: center;

	.content {
		margin-bottom: 20px;
	}

	@media (max-width: 768px) {
		padding-bottom: 5px;
	}
`
