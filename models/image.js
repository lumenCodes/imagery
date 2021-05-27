const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema(
	{
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		title: "string",
		dimension: "number",
		extension: "string",
		imageURL: String,
	},
	{ timestamps: true }
);

imageSchemaValidator = async () => {
	const schema = Joi.object({
		title: Joi.string().min(3).required(),

		dimension: Joi.string().required().trim(),

		extension: Joi.string().required().trim(),
	});
};

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
