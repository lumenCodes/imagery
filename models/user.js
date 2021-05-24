const mongoose = require("mongoose");
const Joi = require("joi");
const {imageSchema} = require('../models/image')

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

		images: [ imageSchema ],

		isAdmin: Boolean,
	},
	{ timestamps: true }
);

exports.userSchemaValidator = async (user) => {
	const schema = Joi.object({
		username: Joi.string().required().trim().lowercase().min(5),
		password: Joi.string().min(5).required(),
		email: Joi.string().trim().lowercase().email(),
		images: Joi.object({
			title:  Joi.string().required().trim(),
			dimension: Joi.number(),
			extension: Joi.string().required().trim()
		})
	});

	const value = await schema.validateAsync(user);
	return value;
};

exports.User = mongoose.model("User", userSchema);
// module.exports = {User};
