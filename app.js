const express = require('express');
const errors = require('./middlewares/Errors')
const start = require('./middlewares/index.middleware');
require('express-async-errors')
require('./config/database')()


const app = express();

start(app)
app.use(errors)

module.exports = app;
