import { NextApiResponse } from 'next'
import axios from 'axios'

import { withSession } from '../../utils/session'

export const handler = async (req: any, res: NextApiResponse) => {
	const token = req.session.get('token')

	if (token) {
		try {
			const { data } = await axios.get(process.env.API_URL + '/auth/me', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})

			res.json({
				isLoggedIn: true,
				...data,
				token,
			})
		} catch (err) {
			req.session.destroy()

			res.json({ isLoggedIn: false })
		}
	} else {
		res.json({ isLoggedIn: false })
	}
}

export default withSession(handler)
