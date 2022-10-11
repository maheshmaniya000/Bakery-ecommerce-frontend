module.exports = () => {
	if (process.env.VERCEL_GIT_COMMIT_REF === 'staging') {
		return {
			env: {
				API_URL: process.env.STAGING_API_URL,
				NEXT_PUBLIC_API_URL: process.env.STAGING_API_URL,
				GOOGLE_CLIENT_ID: process.env.STAGING_GOOGLE_CLIENT_ID,
				GOOGLE_CLIENT_SECRET: process.env.STAGING_GOOGLE_CLIENT_SECRET,
				FB_CLIENT_ID: process.env.STAGING_FB_CLIENT_ID,
				SECRET_COOKIE_PASSWORD:
					process.env.STAGING_SECRET_COOKIE_PASSWORD,
				STRIPE_SECRET: process.env.STAGING_STRIPE_SECRET,
			},
		}
	}

	return {
		env: {
			API_URL: process.env.API_URL,
			NEXT_PUBLIC_API_URL: process.env.API_URL,
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
			FB_CLIENT_ID: process.env.FB_CLIENT_ID,
			SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
			STRIPE_SECRET: process.env.STRIPE_SECRET,
			GA_ID: process.env.GA_ID,
		},
	}
}
