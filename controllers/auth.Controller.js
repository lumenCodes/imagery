const { User, userSchemaValidator } = require('../models/user');
const imageController = require('./image.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


class AuthController{
    createToken = (id) => {
        const maxAge = 24 * 60 * 60 // this 24 hours in minutes
        return jwt.sign({id}, 'mysecretlove', { expiresIn: maxAge })
    };
    login = async (req, res) => {
        const { email, password } = req.body
        
        const validUser = await User.findOne({ email })
        if (!validUser) {
            res.status(400).send({
                success: false,
                message: 'invalid email or password'
            })
        };

        const isValidPassword = await bcrypt.compare(this.password, validUser.password)
        if (!isValidPassword) {
            res.status(400).send({
                success: false,
                message: 'invalid email or password'
            });
        };
        const token = this.createToken(validUser._id)
        res.cookie('jwt', token, { httpOnly: true, expiresIn: this.maxAge * 1000 })
        res.status(200).send({
            success: true,
            message: 'User login successfull',
            data: token
        });

        
    };
};

module.exports = new AuthController()