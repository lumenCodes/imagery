const express = require('express');

const app = express();

const imageRoutes = require('./image.routes');

app.use('/api/v1/images', imageRoutes);//middleware



module.exports = app;
