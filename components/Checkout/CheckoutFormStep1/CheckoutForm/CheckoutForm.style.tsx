import styled from '@/types/styled'
import { StyledSelectGroup } from '@/styles/elements/select-group'
import { StyledSummaryContainer } from '@/styles/elements/container'

export const StyledFormGroup = styled.div`
	position: relative;
	margin-bottom: 20px;

	max-width: 400px;

	input {
		border: 1px solid ${({ theme }) => theme.colors.baseFontColor};
	}
`

export const StyledFormGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 24px;

	max-width: 400px;
`

export const StyledDeliveryGroup = styled(StyledSelectGroup)`
	max-width: 520px;
`

export const StyledAddressContainer = styled(StyledSummaryContainer)`
	display: flex;
	padding: 20px;

	h3 {
		margin-bottom: 5px;
		font-size: 1.8rem;
		line-height: 2rem;
	}

	p {
		color: ${({ theme }) => theme.colors.baseFontColor};
		font-size: 1.3rem;
		line-height: 1.4rem;
	}

	.location-icon {
		margin-right: 20px;
	}
`
