const {User} = require('../models/user');
const imageController = require('./image.controller');



class UserController{
    async delete(req, res){
        try {
            const user = new User(req.body);

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
        const user = User.findByIdAndUpdate()

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
};


module.exports = new UserController()