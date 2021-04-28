const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: 'string',

    email : {
        type: 'string',
        unique: true
    },

    password: {
        type: 'string',
        minlength: 5
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User};