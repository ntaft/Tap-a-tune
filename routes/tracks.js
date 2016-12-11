const trackRouter = require('express').Router();

trackRouter.get('/:id', (req, res) => {
  res.json('return track by id');
});

trackRouter.get('/all/:id', (req, res) => {
  res.json('returns list of all user tracks');
});

trackRouter.post('/', (req, res) => {
  res.status(200);
  console.log(req.body);
  res.json(`saving track id #${req.body.id}`);
});

trackRouter.delete('/:id', (req, res) => {
  res.status(200);
  res.json(`deleting track with id #${req.params.id}`);
});

module.exports = trackRouter;
