const authRouter = require('express').Router();

// authenticates the login, and if true send a json token
authRouter.post('/login', (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid',
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
authRouter.post('/signup', (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid',
  });
});

authRouter.post('/verify', (req, res) => {
  res.json({
    token: res.token || 'invalid',
    id: res.id || 'invalid',
  });
});

module.exports = authRouter;
