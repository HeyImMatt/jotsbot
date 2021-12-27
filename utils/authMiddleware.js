import { verify } from 'jsonwebtoken';

import prisma from '../lib/prisma';
import { JOTSBOT_TOKEN } from './constants';

// 12/26/21: Ideally this would be in a `_middleware` file in the api `/secure` dir.
// Awaiting a fix for this issue where the `req.body` object is null:
// https://github.com/vercel/next.js/issues/30953
const authMiddleware = (handler) => {
	return async (req, res) => {
		// LOA Add proper error handling. DRY up the 401 statuses
		const { email, id } = await verify(req.headers[JOTSBOT_TOKEN], process.env.JWT_SECRET);

		if (!id || !email) {
			return resp.status(401).send('Must be logged in to perform this action.');
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (id !== user.id) {
			return resp.status(401).send('Must be logged in to perform this action.');
		}

		req.user = user;

		return handler(req, res);
	};
};

export default authMiddleware;
