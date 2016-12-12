const db = require('../db/dbConfig');

// gets a list of all avaliable sound files and relational paths
// note that files are stored locally, NOT in the db
function getSoundList(req, res, next) {
  db.any(`SELECT * FROM sounds`)
    .then((sounds) => {
      res.soundList = sounds;
      next();
    })
    .catch(err => next(err));
}

// may eventually add ability to save new sounds here...

module.exports = { getSoundList };
