const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: 'string',
    email : 'string',
    password: 'string'
});

const User = mongoose.model('User', userSchema);

exports.module = {User};