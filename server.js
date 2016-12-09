const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log('listening on port', port));
