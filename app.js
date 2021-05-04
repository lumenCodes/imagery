const express = require('express');
const start = require('./middlewares/index.middleware');
require('express-async-errors')
require('./config/database')()


const app = express();

start(app)

module.exports = app;
