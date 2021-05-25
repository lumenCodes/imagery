const morgan = require('morgan');
const express = require ('express')
const errors = require('./Errors')

const imageRoutes = require('../routes/image.routes');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth');

var fs = require('fs')

var path = require('path')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setting up envirnment
if (!process.env.JWTPRIVATEKEY) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1); 
}


//middlewares
module.exports = (app) => {
    app.use(express.json())
    app.use(morgan('combined',  { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }))
    app.use(morgan('dev'))
    app.use('/api/v1/images', imageRoutes);//middleware
    app.use('/api/v1/users', userRoutes);//middleware
    app.use('/api/v1/auth', authRoutes);//middleware
    
    app.get('/', (request, response) => {
        response.status(200).send('Yeah! Server is life...')
    });

    app.use(errors)
}
