const fileRouter = require('express').Router();
const { getSoundList } = require('../models/files');

// sends a file by name for the web audio api
// use either a psql lookup table or hard links
// fileRouter.get('/:name', (req, res) => {
//   res.send('send a file selected by name/id')
// });

fileRouter.get('/:filename', (req, res) => {
  console.log(req.params.filename);
  res.sendFile(`https://s3.amazonaws.com/tappity/${req.params.filename}.wav`);
});

// lists all avaliable files stored locally (or even remotely)
// including names and links to file paths, etc.
fileRouter.get('/', getSoundList, (req, res) => {
  res.json(res.soundList);
});

module.exports = fileRouter;
