const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user.controller');


userRouter.patch('/', userController.update)

userRouter.delete('/', userController.delete)

userRouter.post('/', userController.create)

userRouter.get('/', userController.getAll)


module.exports= userRouter;