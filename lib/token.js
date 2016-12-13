const jwt = require('jsonwebtoken');

// Nick's note: token should not include protected information (i.e. password)
function createToken(tokenPayload) {
  // get private key from .env, **change in production
  const key = process.env.JWT_SECRET || 'bannanaphone';
  // sign a new encrypted token that expires in 24h
  console.log(tokenPayload);
   const newToken = jwt.sign(tokenPayload, key );
    // returns a shiny new json token
  console.log(newToken);
  return newToken;
}

module.exports = { createToken };
