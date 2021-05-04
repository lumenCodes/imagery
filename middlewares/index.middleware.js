const express = require ('express')

const errors = require('./Errors')

const imageRoutes = require('../routes/image.routes');
const userRoutes = require('../routes/user.routes');

module.exports = (app) => {
    app.use(express.json())
    app.use('/api/v1/images', imageRoutes);//middleware
    app.use('/api/v1/users', userRoutes);//middleware

    app.use(errors)
}
