const express = require('express');
const start = require('./middlewares/index.middleware');
require('express-async-errors')


const app = express();

start(app)

module.exports = app;
