const fileRouter = require('express').Router();

// sends a file by name for the web audio api
// use either a psql lookup table or hard links
res.get('/:name', (req, res) => {
  res.send('send a file selected by name/id')
}

fileRouter.get('/', (req, res) => {
  res.json('list of avaliable files go here');
};

module.exports fileRouter;
