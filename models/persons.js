const mongoose = require("mongoose");
const Joi = require("joi");
const {imageSchema} = require('../models/image')

const personSchema = new mongoose.Schema(
	{
		fullName: {
      type: String,
      required: true
    }

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

exports.Person = mongoose.model("Person", personSchema);
// module.exports = {User};
