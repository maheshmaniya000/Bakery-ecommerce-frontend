import styled from '@/types/styled'
import { StyledSelectGroup } from '@/styles/elements/select-group'

export const StyledPayment = styled.section`
	.form-wrapper {
		padding: 55px 0;
	}

	width: 520px;
	max-width: 100%;

	.payment-accepted {
		display: flex;
		align-items: center;
		flex-direction: row;
		font-size: 1.5rem;
		line-height: 1.7rem;
		font-weight: bold;

		img {
			margin-left: 10px;
		}
	}

	button {
		min-width: 300px;
	}

	.terms {
		display: flex;
		align-items: top;
		padding: 50px 0;

		input {
			margin-right: 10px;
			position: relative;
			top: 2px;
		}
	}
`

export const StyledPaymentMethod = styled(StyledSelectGroup)`
	margin-top: 30px;

	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
	}

	img {
		opacity: 0.2;
	}

	.selected {
		img {
			opacity: 1;
		}
	}
`

export const FormsContainer = styled.div`
	margin-top: 25px;
`

export const Title = styled.div`
	font-weight: bold;
	font-size: 1.7rem;
	line-height: 2rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

export const TextAreaContainer = styled.div`
	padding: 10px;
	margin-top: 26px;
	background-color: #fff;
	border: 1px solid #7c7167;
	border-radius: 4px;
	width: 75%;

	@media (max-width: 768px) {
		width: 100%;
	}
`

export const Count = styled.div`
	text-align: right;
	margin-left: auto;
`
