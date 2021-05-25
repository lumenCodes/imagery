const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
	{
		username: String,

		email: {
			type: String,
			unique: true,
		},

		password: {
			type: String,
			minlength: 5,
		},

		isAdmin: Boolean,
	},
	{ timestamps: true }
);

exports.userSchemaValidator = async (user) => {
	const schema = Joi.object({
		username: Joi.string().required().trim().lowercase().min(5),
		password: Joi.string().min(5).required(),
		email: Joi.string().trim().lowercase().email(),
	});

	const value = await schema.validateAsync(user);
	return value;
};

const User = mongoose.model("User", userSchema);
module.exports = {User};
