import styled from '@/types/styled'
import Head from 'next/head'

const ChildrenContainer = styled.div`
	min-height: calc(100vh - 490px);
`

export const Layout: React.FC = ({ children }) => {
	return (
		<div className="Layout__container">
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>

				<title>Online Bakehouse</title>

				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" />

				<meta name="theme-color" content="#E7D8C3" />
			</Head>
			<ChildrenContainer>{children}</ChildrenContainer>
		</div>
	)
}
