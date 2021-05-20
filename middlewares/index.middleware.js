const config = require('config')
const express = require ('express')
const errors = require('./Errors')

const imageRoutes = require('../routes/image.routes');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth')

// setting up envirnment
if (!process.env.JWTPRIVATEKEY) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1); 
}


//middlewares
module.exports = (app) => {
    app.use(express.json())
    app.use('/api/v1/images', imageRoutes);//middleware
    app.use('/api/v1/users', userRoutes);//middleware
    app.use('/api/v1/auth', authRoutes);//middleware

    app.use(errors)
}
