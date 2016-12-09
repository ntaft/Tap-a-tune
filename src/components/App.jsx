import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super();

    this.state = {
      audioCTX: new (window.AudioContext || window.webkitAudioContext)(),
      source: 0,
    };
  }

componentDidMount() {

  // this.setState ({
  //   audioCTX: new (window.AudioContext || window.webkitAudioContext)(),
  // });
  // for each keypress, make a http request for the audio
  document.addEventListener('keypress', (e) => {
    console.log(e.key);
    switch(e.key) {
      case 'w':
        this.getData('api/files/sound1');
        break;
      case 'a':
        this.getData('api/files/sound2');
        break;
      case 's':
        this.getData('api/files/sound3');
        break;
      case 'd':
        this.getData('api/files/sound4');
        break;
    }
  });
}

  // Web audio API cobbled together from various MDN articles
  // fetches the audio file from our api


  getData(audioFile) {
    const source = this.state.audioCTX.createBufferSource();
    const request = new XMLHttpRequest();

    request.open('GET', audioFile, true);

    request.responseType = 'arraybuffer';

    request.onload = () => {
      let audioData = request.response;
      // decodes the arraybuffer data into web audio
      this.state.audioCTX.decodeAudioData(audioData, (buffer) => {
        // let songLength = buffer.duration;
        source.buffer = buffer;
        // source.playbackRate.value = playbackControl.value;
        source.connect(this.state.audioCTX.destination);
        //source.loop = true;
      },
      (e) => {"Error with decoding audio data" + e.err});
    };
    request.send();
    source.start(0);
  }


  render() {
    return (<h1>Tappity tap tap</h1>)
  }
}
