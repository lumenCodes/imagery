const mongoose = require("mongoose");
const Joi = require("joi");

exports.imageSchema = new mongoose.Schema(
	{
		title: "string",
		dimension: "number",
		extension: "string"
	},
	{ timestamps: true }
);

exports.personImageSchema = new mongoose.Schema(
	{
		title: "string",
		dimension: "number",
		extension: "string",
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "person",
		},
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

// exports.Image = mongoose.model("Image", this.imageSchema);
exports.Image = mongoose.model("PersonImage", this.personImageSchema);


// module.exports = { Image };
