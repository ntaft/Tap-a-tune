import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TapBox from './TapBox/TapBox';
import SavedItem from './SavedItem/SavedItem';
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

  // fetch all of the saved user songs
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

  recordBeat(beatID) {
    // records the time offset from the start of the recording
    const time = new Date().getTime() - this.state.recordedBeat[0][0];
    // sets the recorded array concatinated with the offset time and activated sound
    this.setState({
      recordedBeat: this.state.recordedBeat.concat([[time, beatID]]),
    });
  }

  // creates a new recording instance if there is not already one
  startRecord() {
    if (this.state.recordedBeat) {
      // a nested array is initialized with the current time
      // -note- the time could also be utilized as a unique id number
      const time = new Date().getTime();
      this.setState({
        recordedBeat: [[time, this.state.instruments]],
      });
    }
  }
  // gets a list of all the saved records for the given user
  getSavedList() {
    fetch(`/api/songs/all/${this.state.userID}`, {
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

  saveRecord() {
    fetch('/api/songs', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        beatName: this.state.recordedName,
        beatData: this.state.recordedBeat,
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
    fetch(`/api/songs/${id}`, {
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
        <SavedList />
        <Footer />
      </div>
    );
  }
}
