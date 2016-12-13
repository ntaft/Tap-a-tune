const authRouter = require('express').Router();
const { logIn, verifyUser, dansTempFunc } = require('../models/auth');
const { createUser } = require('../models/user');
// const { createToken } = require('../lib/token');
// const { authenticate } = require('../lib/auth');

// decodes token
// var decoded = jwt.decode(token, {complete: true})

// authenticates the login, and if true send a json token
authRouter.post('/login', logIn, (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid'
  });
});
// assigns null to the session cookie userID
// then redirects to the login page
authRouter.delete('/logout', (req, res) => {
  // req.session.userId = null;
  res.json('logged out');
});

// if posting to newuser, collect form data
// sends token of user data
authRouter.post('/signup', createUser, (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid'
  });
});
// verifies the user authentication session, preserving login
authRouter.post('/verify', verifyUser, (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid'
  });
});

module.exports = authRouter;
