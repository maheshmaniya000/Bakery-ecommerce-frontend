import { NextApiResponse } from 'next'
import axios from 'axios'

import { withSession } from 'utils/session'

const handler = async (req: any, res: NextApiResponse) => {
	try {
		const { data } = await axios.post(
			process.env.API_URL + '/auth/oauth/facebook',
			req.body
		)

		if (!data.accessToken) {
			return res.json({ isLoggedIn: false })
		}

		req.session.set('token', data.accessToken)

		await req.session.save()

		res.json({ isLoggedIn: true })
	} catch (err) {
		const {
			response: { status, data },
		} = err

		res.status(status).json(data)
	}
}

export default withSession(handler)
