const express = require('express');

const app = express();

const imageRoutes = require('./routes/image.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/v1/images', imageRoutes);//middleware
app.use('/api/v1/users', userRoutes);//middleware



module.exports = app;
