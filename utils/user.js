const bcrypt = require('bcrypt');

export const createPasswordHash = async (plainPw) => {
	try {
		const passwordHash = await bcrypt.hash(plainPw, 10);
		return passwordHash;
	} catch (error) {
		throw new Error(`Could not create hashed password: ${error.message}`);
	}
};

export const verifyPasswordHash = async (plainPw, passwordHash) => {
	try {
		return await bcrypt.compare(plainPw, passwordHash);
	} catch (error) {
		throw new Error(`Could not compare password with hash: ${error.message}`);
	}
}
