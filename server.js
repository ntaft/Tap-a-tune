const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const fileRoute = require('./routes/files');
const songRoute = require('./routes/songs');
const authRoute = require('./routes/auth');

const app = express();

const port = process.env.PORT || 3000;
// logger for error handling
app.use(logger('dev'));

// route for serving audio files to Web Audio API
app.use('/api/files', fileRoute);
// route for storing and retrieving user data
app.use('/api/song', songRoute);
// route for user authentication
app.use('/auth', authRoute);

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log('listening on port', port));

module.exports = app;
