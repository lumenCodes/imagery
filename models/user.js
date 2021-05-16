const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: 'string',

    email : {
        type: String,
        unique: true
    },

    password: {
        type: 'string',
        minlength: 5
    }
});

exports.userSchemaValidator = async(user) => {
    const schema = Joi.object({
        username : Joi
            .string()
            .required()
            .trim()
            .lowercase()
            .min(5),
        password : Joi
            .string()
            .min(5)
            .required(),
        email : Joi
            .string()
            .trim()
            .lowercase()
            .email()
    }) 

    const value = await schema.validateAsync(user)
    return value
}

exports.User = mongoose.model('User', userSchema);
