import * as React from 'react'
import { Form } from 'formik'

import { Modal } from '@/components/Modal/Modal'
import { StyledAuth } from '@/styles/elements/auth'
import { StyledSubmitButton } from '@/components/Authentication/Auth.styled'
import { StyledForm } from '@/components/ProductDetail/ProductDetail.style'
import { ProductSpecialForm } from '@/components/ProductSpecialForm/ProductSpecialForm'

interface Props {
	toggleModal: (boolean) => void
	showModal?: boolean
	productDetail: any
	isNoCakeText?: boolean
	onSubmit: (values) => void
}
const EditSpecialItem: React.FC<Props> = ({
	toggleModal,
	showModal = false,
	isNoCakeText,
	productDetail,
	onSubmit,
}) => {
	return (
		<Modal setToggle={toggleModal} isToggled={showModal}>
			<StyledAuth>
				<h3 className="heading">Edit details</h3>
			</StyledAuth>
			<StyledForm
				initialValues={{
					message: productDetail.message,
					candles: productDetail.candles,
					knifes: productDetail.knifes,
				}}
				enableReinitialize={true}
				onSubmit={onSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<ProductSpecialForm isNoCakeText={isNoCakeText} />
						<StyledSubmitButton type="submit">
							Update
						</StyledSubmitButton>
					</Form>
				)}
			</StyledForm>
		</Modal>
	)
}

export default EditSpecialItem
