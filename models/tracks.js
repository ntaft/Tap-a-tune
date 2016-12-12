const db = require('../db/dbConfig');

function showUserTracks(req, res, next) {
  db.any(`SELECT * FROM tracks
    WHERE user_id = $1;`, req.params.id)
    .then((tracks) => {
      res.tracks = tracks;
      next();
    })
    .catch(err => next(err));
}

 // saves each track; recursively inserts all track data from a nested array
function saveTrack(req, res, next) {
  // first inserts the track info, returning the inserted data;
  db.one(`INSERT INTO tracks(user_id, track_name, instruments)
  VALUES($/userId/, $/name/, $/instruments/)
  RETURNING id`, req.body)
  .then((trackData) => {
    console.log('track id is:', trackData.id);
    // then inserts each nested track 'beat' in a single transaction, tagged with the track
    db.tx(t => t.batch(
      req.body.data.map((beat) => {
        // const beatObj = { sound: beat[0], id: beat[1], time: beat[2] };
        t.none(
          `INSERT INTO track_data(track_id, sound_name, beat_id, beat_time)
           VALUES($1, $2, $3, $4);`, [trackData.id, beat[1], beat[2], beat[3]])
      })
    ))
  })
    .then(() => next())
    .catch(err => next(err));
}

// returns all data from a track based on the track ID
function getTrackData(req, res, next) {
  db.any(`SELECT * FROM track_data
    WHERE track_id = $1;`, req.params.id)
    .then((trackData) => {
      res.data = trackData;
      next();
    })
    .catch(err => next(err));
}

function editTrack(req, res, next) {
  // insert edit functionality here
  // maybe just overlay track with additional data and sort?
}

// deletes a track and all of its data in one batch transaction
// note that t is equivalent to 'this' in pg-promise
function deleteTrack(req, res, next) {
  db.tx(t => t.batch([
    t.none(`DELETE FROM tracks
      WHERE id = $1;`, req.params.id),
    t.none(`DELETE FROM track_data
      WHERE track_id = $1;`, req.params.id)
  ]))
  .then(() => next())
  .catch(err => next(err));
}

module.exports = { showUserTracks, saveTrack, getTrackData, editTrack, deleteTrack };
