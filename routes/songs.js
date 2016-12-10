const songRouter = require('express').Router();

songRouter.get('/:id', (req, res) => {
  res.json('return song by id');
});

songRouter.get('/all/:id', (req, res) => {
  res.json('returns list of all user songs');
});

songRouter.post('/', (req, res) => {
  res.status(200);
  console.log(req.body);
  res.json(`saving song id #${req.body.id}`);
});

songRouter.delete('/:id', (req, res) => {
  res.status(200);
  res.json(`deleting song with id #${req.params.id}`);
});

module.exports = songRouter;
