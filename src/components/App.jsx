import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TapBox from './TapBox/TapBox';
import TapControl from './TapControl/TapControl';
import SavedList from './SavedList/SavedList';
import Sidebar from './Sidebar/Sidebar';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super();

    this.state = {
      userID: 0,
      audioCTX: new (window.AudioContext || window.webkitAudioContext)(),
      instruments: [
        'hihat-acoustic01',
        'kick-acoustic01',
        'snare-acoustic01',
        'clap-tape',
        'crash-acoustic'
      ],
      audioData: [0, 0, 0, 0, 0],
      recordedBeat: [],
      recordedName: '',
      savedBeats: [],
      intervalID: 0,
    };

    this.startRecord.bind(this);
    this.stopRecord.bind(this);
    this.saveRecord.bind(this);
  }

componentDidMount() {
  // for each keypress, make a http request for the selected audio
  document.addEventListener('keydown', (e) => {
    console.log(e.key);

    switch(e.key) {
      case 'w':
        this.getAudio(0);
        break;
      case 'a':
        this.getAudio(1);
        break;
      case 's':
        this.getAudio(2);
        break;
      case 'd':
        this.getAudio(3);
        break;
      case 'f':
        this.getAudio(4);
        break;
      case 'r':
        this.startRecord();
        break;
      default:
        break;
    }
  });

  // fetch all of the saved user tracks
}

  // Web audio API cobbled together from various MDN articles
  // fetches the audio file from our api
  getAudio(audioID) {
    const audioFile = this.state.instruments[audioID]
    const source = this.state.audioCTX.createBufferSource();
    const request = new XMLHttpRequest();

    request.open('GET', `api/files/${audioFile}`, true);

    request.responseType = 'arraybuffer';

    request.onload = () => {
      let audioData = request.response;
      // decodes the arraybuffer data into audio
      this.state.audioCTX.decodeAudioData(audioData, (buffer) => {
        source.buffer = buffer;
        source.connect(this.state.audioCTX.destination);
      },
      (e) => {"Error with decoding audio data" + e.err});
    };
    request.send();
    // starts the audio instance
    source.start(0);
  }

  // gets a list of all the saved records for the given user
  getSavedList() {
    fetch(`/api/tracks/all/${this.state.userID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      this.setState({
        savedBeats: response.saved,
      })
    })
    .catch(err => console.log(err));
  }

  // handles the updating of the new track name form
  updateTrackName(e) {
    this.setState({ recordedName: e.target.value });
  }

  // records each beat triggered by the user
  recordBeat(beatId) {
    // records the time offset from the start of the recording
    const elapsedTime = new Date().getTime() - this.state.recordedBeat[0][0];
    // sets the recorded array concatinated with the offset time and activated sound
    // note: the 0 is a default value that will be replaced by the song id
    this.setState({
      recordedBeat: this.state.recordedBeat.concat([[0, beatId, elapsedTime]]),
    });
  }

  // creates a new recording instance if there is not already one
  startRecord() {
    if (this.state.recordedBeat) {
      // a nested array is initialized with the current time
      const startTime = new Date().getTime();
      // first element of the nested array is initialized with defaults
      this.setState({
        recordedBeat: [[0, 0, startTime]],
      });
    }
  }



  endRecord() {
  }

  saveRecord() {
    fetch('/api/tracks', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.recordedName,
        data: this.state.recordedBeat,
        instruments: this.state.instruments,
        userID: this.state.userID
      })
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }

  // authenticate this first?
  // id could be the timestamp...
  loadRecord(id) {
    fetch(`/api/tracks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response.beatName);
      this.setState({
        recordedName: response.beatName,
        recordedBeat: response.beatData
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Header />
        <Sidebar />
        <TapBox />
        <TapControl
          startRecord={this.startRecord}
          stopRecord={this.stopRecord}
          saveRecord={this.saveRecord}
          updateTrackName={e => this.updateTrackName(e)}
        />
        <SavedList />
        <Footer />
      </div>
    );
  }
}
