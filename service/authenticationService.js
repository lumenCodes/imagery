const jwt = require("jsonwebtoken");
const config = require("config");

class AuthenticationService {
	generateLoginAuthToken = (user) => {
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWTPRIVATEKEY,
			{ expiresIn: '1hr' }
		);
	  return token;
	}
}

module.exports = new AuthenticationService();
