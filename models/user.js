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

		// get a user and see the number of images it has
		// images: {  },

		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.virtual("imagesOwned", {
	ref: "Image",
	localField: "_id",
	foreignField: "owner"
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

exports.userSchemaValidator = async (user) => {
	const schema = Joi.object({
		username: Joi.string().required().trim().lowercase().min(5),
		password: Joi.string().min(5).required(),
		email: Joi.string().trim().lowercase().email(),
	});

	const value = await schema.validateAsync(user);
	return value;
};

exports.User = mongoose.model("User", userSchema);
