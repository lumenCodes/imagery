const {User, userSchemaValidator} = require('../models/user');
const imageController = require('./image.controller');
const bcrypt = require('bcrypt');



class UserController{

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
        user.password = await this.hashPassword(req.body.password)
        await user.save()
        
        res.status(200).send({
            success: true,
            message: 'User detail updated',
            data: user
        })
    };
    create = async(req, res) => {
        const validData = await userSchemaValidator(req.body)

        let _user = await User.findOne({ email: validData.email });
        if (_user) return res.status(409).send({ success: false, message: 'A user already exist with this email, Login instead' });

        let user = new User(validData);

        /**
         * So this section does exactly what Joi does in a manual way, 
         * so we can remove it and use Joi instead for validation but I am just going,
         * to live it here for now.
         * 
         * 
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
         * 
        */

        // let _email = await User.findOne({ email: req.body.email }) /// Yhis is an object because findone accepts arguments as objects
        // if (_email) return res.send({
        //     message: 'This email alreayd exist in the DB'
        // })

        user = await this.setPassword(user)
        // user.password = await this.hashPassword(req.body.password)
        await user.save() // why did we use user.save here
        res.status(200).send({
            success: true,
            data: user,
            message: 'New user created'
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
            
            if (!user){
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

    login = async (req, res) => {
        if (!user){
            return 'This is not a registered user'
        }
        let dbPassword = findById()
        let providedPassword = req.body.password

        const passwordMatch = await bcrypt.compare(dbPassword, providedPassword) 
        if (passwordMatch) {
            res.status(200).send({
                success: true,
                message: 'User login succesful'
            })}
            else{
                res.status(401).send({
                    success: false,
                    message: 'User login unsuccesful'
                })
            }
        
    };
};


module.exports = new UserController()


// exports.create = async(req, res) => {
//     const validData = await userSchemaValidator(req.body)

//     let _user = await User.findOne({ email: validData.email });
//     if (_user) return res.status(409).send({ success: false, message: 'A user already exist with this email, Login instead' });

//     let user = new User(validData);

//     /**
//      * So this section does exactly what Joi does in a manual way, 
//      * so we can remove it and use Joi instead for validation but I am just going,
//      * to live it here for now.
//      * 
//      * 
//      if (!(Object.entries(req.body).length)) return res.status(400).send({
//         success: false,
//         message: 'There is no body in the request'
//     })


//     const reqBody = Object.keys(req.body) //array
//     const userSchema = ['email', 'password', 'username']
//     for (let field of userSchema  ) {
//         if (!reqBody.includes(field)) {
//             return res.status(400).send({ 
//                 success: false, 
//                 message: field +' is required'
//              })
//         }
//     }
//      * 
//     */

//     // let _email = await User.findOne({ email: req.body.email }) /// Yhis is an object because findone accepts arguments as objects
//     // if (_email) return res.send({
//     //     message: 'This email alreayd exist in the DB'
//     // })

//     user = await this.setPassword(user, req.body.password)
//     // user.password = await this.hashPassword(req.body.password)
//     await user.save() // why did we use user.save here
//     res.status(200).send({
//         success: true,
//         data: user,
//         message: 'New user created'
//     });
// };