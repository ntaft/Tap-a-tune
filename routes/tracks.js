const { showUserTracks, saveTrack, getTrackData, editTrack, deleteTrack } = require('../models/tracks');

const trackRouter = require('express').Router();

trackRouter.get('/all/:id', showUserTracks, (req, res) => {
  res.json(res.tracks);
});

trackRouter.get('/:id', getTrackData, (req, res) => {
  res.json(res.trackData);
  console.log(`sending track data with id #${req.params.id}`);
});

trackRouter.delete('/:id', deleteTrack, (req, res) => {
  res.status(200);
  res.json(`deleting track with id #${req.params.id}`);
});

trackRouter.put('/:id', editTrack, (req, res) => {
  res.status(200);
  res.json(`modifying track with id #${req.params.id}`);
});

trackRouter.post('/', saveTrack, (req, res) => {
  res.json('saved track to db');
});

module.exports = trackRouter;
