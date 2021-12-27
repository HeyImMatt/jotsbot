import authMiddleware from "../../../../utils/authMiddleware";

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { user } = req;
		const { promptId, text } = req.body;

		if (!text) {
			return res.status(400).send('Jot cannot be blank.');
		}

		const jot = await prisma.jot.create({ data: { promptId, text, userId: user.id } });

		return res.status(200).json(jot);
	}

	return res.status(400).send('Invalid request method.');
};

export default authMiddleware(handler);
