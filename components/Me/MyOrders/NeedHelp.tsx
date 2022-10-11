import styled from '@emotion/styled'

const Container = styled.div`
	background: #f4f1ed;
	border: 1px solid #7c7167;
	padding: 30px 20px;
	margin-bottom: auto;
`

const Title = styled.div`
	font-weight: bold;
	font-size: 1.6rem;
	line-height: 2.4rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const Description = styled.div`
	margin-top: 20px;
	font-size: 1.6rem;
	line-height: 1.9rem;
	letter-spacing: 0.05em;
	color: #7e5000;
`

const Link = styled.a`
	text-decoration: underline;
`

const NeedHelp = () => {
	return (
		<Container>
			<Title>Need help on your order?</Title>
			<Description>
				You can contact us and we will try our best to help you!
				<br />
				<br />
				Calls / Whatsapp:
				<br />
				<Link
					href="tel:+65 8891 5819"
					target="__blank"
					rel="noopener noreferrer"
				>
					+65 8891 5819
				</Link>
				<br />
				<br />
				Email: <br />{' '}
				<Link
					href="mailto:hello@Onlinebakehouse.com"
					target="__blank"
					rel="noopener noreferrer"
				>
					hello@Onlinebakehouse.com
				</Link>
			</Description>
		</Container>
	)
}

export default NeedHelp
