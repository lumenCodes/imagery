const {User} = require('../models/user');
const imageController = require('./image.controller');



class UserController{
    async delete(req, res){
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
    async update(req, res){
        // validate
        if(!(Object.entries(req.body).length)){
            return res.status(400).send({
                success: false,
                message: 'There is no update parameter'
            })
        }

        const options = {
            new: true
        }
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).send({
            success: false,
            message: 'user not found or them deltam'
        })

        user.username = req.body.username;
        user.password = req.body.password;

        await user.save()
        
        res.status(200).send({
            success: true,
            message: 'User detail updated',
            data: user
        })
    };
    async create(req, res){
        const user = new User(req.body);

        if (!(Object.entries(req.body).length)) return res.status(400).send({
            success: false,
            message: 'There is no body in the request'
        })


        const reqBody = Object.keys(req.body) //array
        const userSchema = ['email', 'password', 'username']
        for (let field of userSchema  ) {
            if (!reqBody.includes(field)) {
                return res.status(400).send({ 
                    success: false, 
                    message: field +' is required'
                 })
            }
        }

        
        let _user = await User.findOne({ email: req.body.email });
        if (_user) return res.status(409).send({ success: false, message: 'A user already exist with this email, Login instead' });

        let _email = await User.findOne({ email: req.body.email }) /// Yhis is an object because findone accepts arguments as objects
        if (_email) return res.send({
            message: 'This email alreayd exist in the DB'
        })

        await user.save() // why did we use user.save here
        res.status(200).send({
            success: true,
            data: user,
            message: 'New user created'
        });
    };
    async getAll(req, res){
        const users = await User.find()
        res.status(200).send({
            success: true,
            message: 'This is all the users',            
            data: users
        })
    }
    async getOne(req, res) {
        try {
            const user = await User.findById({
                _id: req.params.id
            })
            // if it is null
            // if it is undefined

            // let userNotFound = user === undefined ? false : user === null ? false : true;

            // if (user === undefined) {
            //     userNotFound = false;
            // } else if(user === null) {
            //     userNotFound = false
            // }

            if (!user){
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
    }
};


module.exports = new UserController()