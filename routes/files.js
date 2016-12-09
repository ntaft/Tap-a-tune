const fileRouter = require('express').Router();

// sends a file by name for the web audio api
// use either a psql lookup table or hard links
// fileRouter.get('/:name', (req, res) => {
//   res.send('send a file selected by name/id')
// });

fileRouter.get('/sound1', (req, res) => {
  res.sendFile('/Users/ntaft/Desktop/Samples/kick-808.wav')
});

fileRouter.get('/sound2', (req, res) => {
  res.sendFile('/Users/ntaft/Desktop/Samples/snare-808.wav')
});

fileRouter.get('/sound3', (req, res) => {
  res.sendFile('/Users/ntaft/Desktop/Samples/tom-808.wav')
});

fileRouter.get('/sound4', (req, res) => {
  res.sendFile('/Users/ntaft/Desktop/Samples/hihat-808.wav')
});

// lists all avaliable files
fileRouter.get('/', (req, res) => {
  res.sendFile('/Users/ntaft/code/wdi/projects/project4/Tappity/public/audio-demo.html');
});

module.exports = fileRouter;
