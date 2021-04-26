const express = require('express');
const mongoose = require('mongoose');

const app = express();

const imageRoutes = require('./routes/image.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json())

app.use('/api/v1/images', imageRoutes);//middleware
app.use('/api/v1/users', userRoutes);//middleware



    mongoose.connect('mongodb://localhost:27017/imagery',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log('Connected to database...')

    })
    .catch((error) => {
        console.log('Failed connecting to db', error)

    });


module.exports = app;
