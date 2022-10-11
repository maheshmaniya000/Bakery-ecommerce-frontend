import { NextApiHandler } from 'next'
import { withIronSession } from 'next-iron-session'

export const withSession = (handler: NextApiHandler) => {
	return withIronSession(handler, {
		password: process.env.SECRET_COOKIE_PASSWORD,
		cookieName: 'Onlinebakehouse.com',
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production',
		},
	})
}
