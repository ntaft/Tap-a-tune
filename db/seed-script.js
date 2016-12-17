
let fileNames = 'Ab5.mp3*Bb1.mp3*C6.mp3*Db3.mp3*Gb3.mp3*Ab6.mp3*Bb2.mp3*C7.mp3*Db4.mp3*Eb1.mp3*Gb4.mp3*Ab7.mp3*Bb3.mp3*C8.mp3*Db5.mp3*Eb2.mp3*Gb5.mp3*Bb4.mp3*D1.mp3*Db6.mp3*Eb3.mp3*Gb6.mp3*Bb5.mp3*D2.mp3*Db7.mp3*Eb4.mp3*G2.mp3*Gb7.mp3*Bb6.mp3*D3.mp3*Db8.mp3*Eb5.mp3*G3.mp3*Bb7.mp3*D4.mp3*Eb6.mp3*G4.mp3*D5.mp3*Eb7.mp3*G5.mp3*Ab1.mp3D6.mpG6.mp3*Ab2.mp3*D7.mp3*G7.mp3*Ab3.mp3*Ab4.mp3*Bb0.mp3*Db2.mp3*Gb2.mp3'
// let fileNames = 'clap-808.wav*kick-tron.wav*shaker-suckup.wav*clap-analog.wav*kick-zapper.wav*snare-808.wav*cowbell-808.wav*openhat-808.wav*snare-analog.wav*crash-808.wav*openhat-analog.wav*snare-big.wav*crash-acoustic.wav*openhat-slick.wav*snare-electro.wav*hihat-808.wav*perc-808.wav*snare-sumo.wav*hihat-digital.wav* perc-laser.wav*tom-808.wav*hihat-electro.wav*perc-tambo.wav*tom-analog.wav*hihat-plain.wav*perc-tribal.wav*tom-lofi.wav*kick-808.wav*shaker-analog.wav*tom-rototom.wav*kick-classic.wav*shaker-shuffle.wav*'
const filePath = 'https://s3.amazonaws.com/tappity/';
const category = 'piano';

fileNames = fileNames.split('*');
const output = fileNames.map((fileName) => {
  const name = fileName.slice(0, -4);
  return `INSERT INTO sounds (name, file_name, file_path, category) VALUES('${name}', '${fileName}', '${filePath}', '${category}'); `
});

console.log(output.join(''));
