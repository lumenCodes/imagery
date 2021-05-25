const jwt = require("jsonwebtoken");


class AuthenticationService {
	generateLoginAuthToken = (user) => {
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWTPRIVATEKEY,
			{ expiresIn: '24hr' }
		);
	  return token;
	}
}

module.exports = new AuthenticationService();
