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
        res.send('user details updated succesfully')
    };
};


module.exports = new UserController()