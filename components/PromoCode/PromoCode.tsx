import { useContext, useState } from 'react'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'

import { ApplicationContext } from 'context/ApplicationContext'
import services from 'services'

import ErrorField from '@/components/Form/FormErrorField'
import {
	StyledPromoCodeForm,
	StyledSubmitButton,
} from '@/components/PromoCode/PromoCode.style'
import { useUser } from 'data/useUser'

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Promo code is required!'),
})

const PromoCode = () => {
	const { appliedPromo, setAppliedPromo, summary } = useContext(
		ApplicationContext
	)
	const { user } = useUser({ redirectIfFound: false })

	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async (promoCode) => {
		if (!user.isLoggedIn) {
			setError('Please login to use promo code')
			return
		}

		setError('')
		setIsLoading(true)

		try {
			const { data } = await services.checkPromoCode(
				promoCode,
				summary.productsAmount,
				user.token
			)
			if (data) {
				setAppliedPromo(data)
			}
		} catch (error) {
			setError(error.response.data.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Formik
			initialValues={{ code: appliedPromo?.usedCode || '' }}
			validationSchema={validationSchema}
			onSubmit={(values) => onSubmit(values.code)}
		>
			{({ isValid, dirty }) => (
				<StyledPromoCodeForm>
					<div className="input-wrapper">
						<Field name="code" type="text" className="input" />
						<ErrorField
							error={error}
							style={{ position: 'absolute' }}
						/>
					</div>

					<StyledSubmitButton
						type="submit"
						disabled={(!isValid && !dirty) || isLoading}
					>
						{isLoading ? 'Loading...' : 'Apply'}
					</StyledSubmitButton>
				</StyledPromoCodeForm>
			)}
		</Formik>
	)
}

export default PromoCode
