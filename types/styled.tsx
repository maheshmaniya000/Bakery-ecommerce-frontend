import styled, { CreateStyled } from '@emotion/styled'

export type Theme = {
	colors: {
		primary: string
		secondary: string
		error: string

		baseFontColor: string
		linkColor: string

		borderColor: string
	}

	variables: {
		maxWidth: string
	}
}

export default styled as CreateStyled<Theme>
