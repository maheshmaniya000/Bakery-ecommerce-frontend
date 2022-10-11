import styled from '@/types/styled'

export const Container = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #fff;
	z-index: 10000;

	@media (max-width: 768px) {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;

		font-size: 1.4rem;
	}
`
