import prisma from '../../../lib/prisma';
import { createPasswordHash } from '../../../utils/user';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name, email, password: plainPw } = req.body;

		if (!name || !email || !plainPw) {
			return res.status(400).send('Name, email and password cannot be blank.');
		}

		try {
			const password = await createPasswordHash(plainPw);
			const user = await prisma.user.create({ data: { name, email, password } });

			return res.status(200).json({
				email: user.email,
				id: user.id,
				name: user.name,
				status: user.status,
			});
		} catch (error) {
			console.error(`Error creating user: ${error.message}`);
			return res.status(400).send('Error creating user.');
		}
	}

	return res.status(400).send('Invalid request method.');
}
