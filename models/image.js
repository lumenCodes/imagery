const mongoose = require("mongoose");
const Joi = require('joi')

const imageSchema = new mongoose.Schema({
    title: 'string',
    dimension: 'number',
    extension: 'string'
});

imageSchemaValidator = async() => {
    const schema = Joi.object({
        title: Joi
            .string()
            .min(3)
            .required(),

        dimension: Joi
            .string()
            .required()
            .trim(),
            
        extension: Joi
            .string()
            .required()
            .trim()

    })
}

const Image = mongoose.model('Image', imageSchema);

module.exports = {Image}