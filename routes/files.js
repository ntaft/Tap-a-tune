const fileRouter = require('express').Router();

// sends a file by name for the web audio api
// use either a psql lookup table or hard links
// fileRouter.get('/:name', (req, res) => {
//   res.send('send a file selected by name/id')
// });

fileRouter.get('/:filename', (req, res) => {
  console.log(req.params.filename);
  res.sendFile(`/Users/ntaft/Desktop/Samples/${req.params.filename}.wav`);
});

// lists all avaliable files
fileRouter.get('/', (req, res) => {
  res.sendFile('/Users/ntaft/code/wdi/projects/project4/Tappity/public/audio-demo.html');
});

module.exports = fileRouter;
