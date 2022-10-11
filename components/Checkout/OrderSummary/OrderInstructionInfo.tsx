import styled from '@emotion/styled'

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 2rem;
`

const Title = styled.div`
	font-weight: bold;
	font-size: 1.7rem;
	line-height: 2.4rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const Edit = styled.div`
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.7rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
	cursor: pointer;
`

const Message = styled.div`
	margin-top: 10px;
	font-family: Marion;
	font-size: 1.6rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

interface Props {
	onOpen: () => void
	note?: string
	title?: string
	isEditable: boolean
}

export default function OrderInstructionInfo({
	onOpen,
	isEditable,
	note,
	title = 'Instruction to team',
}: Props) {
	return (
		<div>
			<TitleContainer>
				<Title>{title}</Title>
				{isEditable && <Edit onClick={onOpen}>Edit</Edit>}
			</TitleContainer>
			<Message>{note || '---'}</Message>
		</div>
	)
}
