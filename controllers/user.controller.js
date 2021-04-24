const {User} = require('../models/user');
const imageController = require('./image.controller');



class UserController{
    async delete(req, res){
        try {
            const user = await User.findByIdAndRemove(req.params.id);

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
        const options = {
            new: true
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body)

        res.status(201).send({
            success: true,
            message: 'User detail updated',
            data: user
        })
    };
    async create(req, res){
        const user = new User(req.body);

        await user.save()
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