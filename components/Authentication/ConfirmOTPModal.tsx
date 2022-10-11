import OtpInput from 'react-otp-input'
import { useState } from 'react'

import { Modal } from '@/components/Modal/Modal'

import { StyledAuth } from '@/styles/elements/auth'
import { StyledOTP } from '@/styles/elements/otp'
import {
	StyledFormDescription,
	StyledSubmitButton,
	StyledFormGroup,
} from '@/components/Authentication/Auth.styled'

interface Props {
	toggleModal: (boolean) => void
	onSubmit: (values) => void
	showModal?: boolean
}

const ConfirmOTPModal = ({
	toggleModal,
	showModal = false,
	onSubmit,
}: Props) => {
	const [otp, setOtp] = useState('')

	return (
		<Modal setToggle={toggleModal} isToggled={showModal}>
			<StyledAuth>
				<h3 className="heading">Verify OTP</h3>

				<StyledFormDescription>
					Please check your email address for the one-time password
					(OTP)
				</StyledFormDescription>

				<StyledFormGroup>
					<StyledOTP>
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							separator={<span>&nbsp;</span>}
							isInputNum={true}
							containerStyle="container"
							inputStyle="item"
						/>
					</StyledOTP>
				</StyledFormGroup>
				<StyledSubmitButton
					type="button"
					disabled={otp.length !== 6}
					onClick={() => {
						onSubmit(otp)
					}}
				>
					Submit
				</StyledSubmitButton>
			</StyledAuth>
		</Modal>
	)
}

export default ConfirmOTPModal
