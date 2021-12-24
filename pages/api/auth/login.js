import prisma from '../../../lib/prisma';
import { verifyPasswordHash } from '../../../utils/user';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, password: plainPw } = req.body;

		if (!email || !plainPw) {
			return res.status(400).send('Email or password cannot be blank.');
		}

		const user = await prisma.user.findUnique({
			where: { email },
			include: { jots: true },
		});

		const pwMatch = await verifyPasswordHash(plainPw, user.password);

		if (pwMatch) {
			return res.status(200).json({
				email: user.email,
				id: user.id,
				name: user.name,
				status: user.status,
				jots: user.jots,
			});
		}

		return res.status(401).send('Authentication failed.');
	}

	return res.status(400).send('Invalid request method.');
}
