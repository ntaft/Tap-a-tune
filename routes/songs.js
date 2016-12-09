const songRouter = require('express').Router();

songRouter.get('/:id', (req, res) => {
  res.json('return song by id');
});

songRouter.get('/', (req, res) => {
  res.json('returns list of all user songs');
});

songRouter.post('/', (req, res) => {
  res.response(200, 'posting a song');
});

songRouter.delete('/:id', (req, res) => {
  res.response(200, 'deleting song by id');
});

module.exports = songRouter;
