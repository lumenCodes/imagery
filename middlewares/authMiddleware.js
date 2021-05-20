const jwt = require("jsonwebtoken");
const config = require("config");

exports.authorization = (req, res, next) => {
	const authToken = req.header("x-auth-token");
	if (!authToken) return res.status(401).send({ message: "Access denied" });

	try {
		const accessPermission = jwt.verify(authToken, config.get("jwtPrivateKey"));
		req.user = accessPermission;
		console.log(req.user)
		next();
		
	} catch (error) {
		next(error)
		return res.status(401).send({ message: "Access denied" });
	}
};

exports.isAdminAuthorization = (req, res, next) => {
	if (!req.user.isAdmin) return res.status(403).send("Access denied");
	next();
};
// module.exports = {authorization,isAdminAuthorization }
