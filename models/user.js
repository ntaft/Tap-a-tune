// adapted from user management code attributed to Rafa @ GA. Thanks!
// originally using mongo, modified for Postgres

const db = require('../db/dbConfig');
const bcrypt = require ('bcryptjs');
const { createToken } = require('../lib/token');

  // creates a new user object using form input
  function createUser(req, res, next) {
    const SALTROUNDS = 10;
    const userObject = {
      username: req.body.username,
      // encrypts the password in a hash + saltrounds
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
    };
    console.log(userObject);
  db.one(`INSERT INTO users ( username, password )
    VALUES ($/username/, $/password/)
    RETURNING id`, userObject)
    // .catch(error => console.log(error));
    // // then gets the newly created data from the db
    // db.one(`SELECT *
    //   FROM users
    //   WHERE username = $/username/
    //   AND password = $/password/;`, userObject)
      .then((result) => {
        console.log(result);
        res.token = createToken(userObject);
        res.id = result.id;
        next();
      })
      .catch(error => next(error));
    };


function getUserById(id) {
  db.one(`SELECT *
      FROM users
      WHERE id = '${id}';`)
    .then(user => user)
    .catch((error) => console.log(error));
}

function getUserByUsername(name) {
  db.any(`SELECT *
    FROM users
    WHERE username = '${name}';`)
    .then(user => user)
    .catch((error) => console.log(error));
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
