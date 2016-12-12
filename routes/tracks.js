const { showUserTracks, saveTrack, getTrackData, editTrack, deleteTrack } = require('../models/tracks');

const trackRouter = require('express').Router();

trackRouter.get('/all/:id', showUserTracks, (req, res) => {
  res.json(res.tracks);
});

trackRouter.get('/:id', getTrackData, (req, res) => {
  res.json(res.data);
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
  // res.status(200);
  res.json(res.body);
});

module.exports = trackRouter;
