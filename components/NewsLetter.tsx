import { StyledNewsLetter } from '@/styles/elements/newsletter'
import { StyledButton } from '@/styles/elements'
import styled from '@/types/styled'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import services from 'services'
import { useState } from 'react'

const Submit = styled(StyledButton)`
	background-color: transparent;
	border: 0;
	min-width: 0;
`

interface FormValues {
	email: string
}

const initialValues: FormValues = {
	email: '',
}

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email('Invalid email'),
})

function NewsLetter() {
	const [status, setStatus] = useState('')

	const onSubmit = async (email) => {
		try {
			setStatus('loading')
			const res = await services.newsletterSubscription(email)
			if (res.success) {
				setStatus('success')
			} else {
				setStatus('error')
			}
		} catch (error) {
			setStatus('error')
		}
	}

	return (
		<StyledNewsLetter>
			<div className="content">
				<h4>
					Journey with us in parenthood, entrepreneurship and life’s
					wins &amp; challenges. <br />
					Get updates on our sharing, stories &amp; community events
				</h4>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => onSubmit(values.email)}
				>
					<Form className="form">
						<label htmlFor="email">
							<img
								src="/images/icons/email.svg"
								alt="contact email"
								className="email-icon"
							/>
							<Field
								type="email"
								className="input"
								required
								name="email"
								id="email"
								placeholder="Email"
							/>
						</label>
						<Submit type="submit">
							<svg
								width="2rem"
								height="2rem"
								viewBox="0 0 16 16"
								className="bi bi-arrow-right"
								fill="#000"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
								/>
							</svg>
						</Submit>
					</Form>
				</Formik>
				<div className="status">
					{status === ''
						? ''
						: status === 'success'
						? 'Successfully subscribed'
						: status === 'loading'
						? 'Loading...'
						: 'Subscription failed'}
				</div>
			</div>
		</StyledNewsLetter>
	)
}

export default NewsLetter
