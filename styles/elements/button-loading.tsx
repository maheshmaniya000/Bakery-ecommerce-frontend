import styled from '@/types/styled'

const Loader = styled.div`
	display: inline-block;
	position: relative;
	width: 40px;
	height: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 4px;

	div {
		position: relative;
		background: #fff;
		animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}
	div:nth-child(1) {
		animation-delay: -0.24s;
	}
	div:nth-child(2) {
		animation-delay: -0.12s;
	}
	div:nth-child(3) {
		animation-delay: 0;
	}
	@keyframes lds-facebook {
		0% {
			top: -4px;
		}
		50%,
		100% {
			top: 4px;
		}
	}
`

export const ButtonLoading = () => (
	<Loader>
		<div />
		<div />
		<div />
	</Loader>
)

// .lds-facebook {
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//   }
//   .lds-facebook div {
//     display: inline-block;
//     position: absolute;
//     left: 8px;
//     width: 16px;
//     background: #fff;
//     animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
//   }
//   .lds-facebook div:nth-child(1) {
//     left: 8px;
//     animation-delay: -0.24s;
//   }
//   .lds-facebook div:nth-child(2) {
//     left: 32px;
//     animation-delay: -0.12s;
//   }
//   .lds-facebook div:nth-child(3) {
//     left: 56px;
//     animation-delay: 0;
//   }
//   @keyframes lds-facebook {
//     0% {
//       top: 8px;
//       height: 64px;
//     }
//     50%, 100% {
//       top: 24px;
//       height: 32px;
//     }
//   }
