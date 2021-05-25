const jwt = require("jsonwebtoken");


exports.authorization = (req, res, next) => {
	const authToken = req.header("x-auth-login-token");
	if (!authToken) return res.status(401).send({ message: "Access denied" });

	try {
		const accessPermission = jwt.verify(authToken, process.env.JWTPRIVATEKEY);
		req.user = accessPermission;
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
