const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

port = process.env.PORT || 8000;

app.use(logger('dev'));

app.listen(port, () => console.log('listening on port', port));
