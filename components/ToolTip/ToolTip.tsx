import { useState } from 'react'
import { ToolTipStyled } from '@/components/ToolTip/ToolTip.styles'

interface Props {
	message: string
	position?: 'top' | 'left' | 'bottom' | 'right'
	children: React.ReactNode
}

export const ToolTip: React.FC<Props> = ({
	message,
	position = 'bottom',
	children,
}) => {
	const [displayTooltip, toggleTooltip] = useState(false)

	return (
		<ToolTipStyled onMouseLeave={() => toggleTooltip(false)}>
			{displayTooltip && (
				<div className={`tooltip-bubble tooltip-${position}`}>
					<div className="tooltip-message">{message}</div>
				</div>
			)}
			<span
				className="tooltip-trigger"
				onMouseOver={() => toggleTooltip(true)}
			>
				{children}
			</span>
		</ToolTipStyled>
	)
}
