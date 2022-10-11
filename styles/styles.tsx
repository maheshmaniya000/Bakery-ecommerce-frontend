import { Global, css } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

export const globalStyles = (theme) => (
	<Global
		styles={css`
			${emotionNormalize}

			@font-face {
				font-family: 'Marion Regular';
				src: url(https://cdn.shopify.com/s/files/1/2800/8456/t/4/assets/inthebrickyardz-marion-regular.ttf?v=1591695007);
			}

			*,
			*::after,
			*::before {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}

			html,
			body {
				letter-spacing: 0.05rem;

				@media (max-width: 767px) {
					overflow-x: hidden;
				}
			}

			html {
				font-size: 62.5%;
				-webkit-font-smoothing: antialiased;
				-ms-overflow-style: scrollbar;

				@media (max-width: 1200px) {
					font-size: 60%;
				}

				@media (max-width: 767px) {
					font-size: 58%;
				}
			}

			body {
				font-family: 'Marion Regular', serif;
				font-size: 1.6rem;
				color: ${theme.colors.baseFontColor};
				line-height: normal;
			}

			.Layout__container {
				background-color: #ffffff;
			}

			ul {
				list-style: none;
			}

			.leaflet-container {
				height: 350px;
				width: 100%;
			}

			a {
				text-decoration: none;
				color: #7e5000;
			}

			.z-99 {
				z-index: 99;
			}
		`}
	/>
)
