const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const fileRoute = require('./routes/files');
const songRoute = require('./routes/songs');
const authRoute = require('./routes/auth');

const app = express();

const port = process.env.PORT || 3000;
// logger for error handling
app.use(logger('dev'));
// parses url-encoded form data payloads from our ajax requests
app.use(bodyParser.json());

// route for serving audio files to Web Audio API
app.use('/api/files', fileRoute);
// route for storing and retrieving user song data
app.use('/api/songs', songRoute);
// route for user authentication
app.use('/auth', authRoute);

// sets static path to dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log('tappity tap tapping 🤘 ', port));

module.exports = app;
