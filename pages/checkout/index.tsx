import AppSEO from '@/components/App/SEO'
import { CheckoutContainer } from '../../components/CheckoutContainer'

const Checkout = (): JSX.Element => {
	return (
		<>
			<AppSEO noIndex />
			<CheckoutContainer />
		</>
	)
}

export default Checkout
