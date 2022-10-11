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

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;

	@media (min-width: 769px) {
		max-width: 700px;
	}
`
