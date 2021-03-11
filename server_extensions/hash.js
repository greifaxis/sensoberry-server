const bcrypt = require('bcrypt');

const hashPassword = async (plainTextPassword) => {
	const saltRounds = 5;
	try {
		return await bcrypt.hash(plainTextPassword, saltRounds);
	} catch (e) {
		return e.message;
	}
};

const compareHash = async (plainTextPassword, hashedPassword) => {
	try {
		return await bcrypt.compare(plainTextPassword, hashedPassword);
	} catch (e) {
		console.log(e);
		return false;
	}
};

module.exports = {
	hashPassword,
	compareHash,
};
