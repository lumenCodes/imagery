const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user.controller');


userRouter.patch('/:id', userController.update)

userRouter.delete('/:id', userController.delete)

userRouter.post('/', userController.create)

userRouter.get('/', userController.getAll)

userRouter.get('/:id', userController.getOne)

userRouter.get('/imagesbyme/:id', userController.postbyme)


module.exports= userRouter;