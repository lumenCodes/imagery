const { User, userSchemaValidator } = require('../models/user');
const imageController = require('./image.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



class UserController {

    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10) //why not use one function to generate salt and hash password
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    };

    setPassword = async (user, password = null) => {

        const newPassword = password ? password : user.password;

        const hashedPassword = await this.hashPassword(newPassword)

        user.password = hashedPassword
        return user;
    }

    delete = async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            if (!user) return res.status(400).send({
                success: false,
                message: 'user is not in the database or Incorrect user id'
            })
            await user.delete()
            res.status(201).send({
                success: true,
                message: ' User deleted succesfully',
                data: user
            });

        } catch (error) {
            res.send(error)
        }

    };
    update = async (req, res) => {
        // validate
        if (!(Object.entries(req.body).length)) {
            return res.status(400).send({
                success: false,
                message: 'There is no update parameter'
            })
        }

        const options = {
            new: true
        }
        const user = await User.findById(req.params.id)
        if (!user) return res.status(400).send({
            success: false,
            message: 'user not found or them deltam'
        })

        user.username = req.body.username;
        user.password = await this.hashPassword(req.body.password)
        await user.save()

        res.status(200).send({
            success: true,
            message: 'User detail updated',
            data: user
        })
    };
    create = async (req, res) => {
        const validData = await userSchemaValidator(req.body)

        let _user = await User.findOne({ email: validData.email });
        if (_user) return res.status(409).send({ success: false, message: 'A user already exist with this email, Login instead' });

        let user = new User(validData);

        user = await this.setPassword(user)
        await user.save() // why did we use user.save here
        res.status(201).send({
            success: true,
            message: 'New user created',
            data: user
        });
    };

    getAll = async (req, res) => {
        const users = await User.find()
        res.status(200).send({
            success: true,
            message: 'This is all the users',
            data: users
        })
    };

    getOne = async (req, res) => {
        try {
            const user = await User.findById({
                _id: req.params.id
            })

            if (!user) {
                // if this si not a valid user id
                return res.status(404).send({
                    success: false,
                    message: 'user not found'
                })
            }

            res.status(200).send({
                success: true,
                message: 'user retreived',
                data: user
            })
        } catch (error) {
            return res.status(404).send({
                success: false,
                message: error.message,
                deatil: error
            })
        }
    };

    
};


module.exports = new UserController()
