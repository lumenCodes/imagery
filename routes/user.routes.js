const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user.controller');


userRouter.patch('/', userController.update)

userRouter.delete('/', userController.delete)

module.exports= userRouter;