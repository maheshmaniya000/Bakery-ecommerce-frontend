import styled from '@emotion/styled'

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	recipient: string
	giftMessage?: string
	note?: string
	isEditable: boolean
}

const GiftTagInfo = ({ onOpen, giftMessage, isEditable }: Props) => {
	return (
		<div>
			<TitleContainer>
				<Title>Gift message</Title>
				{isEditable && <Edit onClick={onOpen}>Edit</Edit>}
			</TitleContainer>
			<Message>{giftMessage || '---'}</Message>
		</div>
	)
}

export default GiftTagInfo
