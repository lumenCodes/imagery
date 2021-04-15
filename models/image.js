const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title: 'string',
    dimension: 'number',
    extension: 'string'
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {Image}