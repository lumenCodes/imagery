const { User, userSchemaValidator } = require("../models/user");
const imageController = require("./image.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticationService = require("../service/authenticationService");

class AuthController {
	login = async (req, res) => {
		const { email, password } = req.body;

		const validUser = await User.findOne({ email });
		if (!validUser) {
			res.status(400).send({
				success: false,
				message: "invalid email or password",
			});
		}

		const isValidPassword = await bcrypt.compare(password, validUser.password);
		if (!isValidPassword) {
			res.status(400).send({
				success: false,
				message: "invalid email or password",
			});
		}

		const token = authenticationService.generateLoginAuthToken(validUser);
		res.header("x-login-auth-token", token)
		res.status(200).send({
			success: true,
			message: "User login successfull",
			data: token,
		});
	};
}

module.exports = new AuthController();
