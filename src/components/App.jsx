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
      // substantiating interface for web audio API
      audioCTX: new (window.AudioContext || window.webkitAudioContext)(),
      instruments: [
        'hihat-acoustic01',
        'kick-acoustic01',
        'snare-acoustic01',
        'clap-tape',
        'crash-acoustic'
      ],
      audioData: [0, 0, 0, 0, 0],
      // variables for recording new tracks
      recordedBeat: [],
      recordedName: '',
      savedBeats: [],
      recording: false,
      // variables for playback of tracks
      interCode: 0,
      startTime: 0,
      trackPos: 1
    };

    // binding functions as necessary
    this.startRecord.bind(this);
    this.stopRecord.bind(this);
    this.saveRecord.bind(this);
    this.clearRecord.bind(this);
    this.recordTapHandler.bind(this);
    this.playTrack.bind(this);

  }

  componentDidMount() {
  // for each keypress, make a http request for the selected audio
    document.addEventListener('keydown', (e) => {
      console.log(e.key);

      switch (e.key) {
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
        case 't':
          this.stopRecord();
          break;
        case 'y':
          this.clearRecord();
          break;
        case 'e':
          this.playTrack();
          break;
        default:
          break;
      }
    });
  }

  // Web audio API cobbled together from various MDN articles
  // fetches the audio file from our api
  getAudio(audioID) {
    if (this.state.recording) this.recordTapHandler(audioID);

    const audioFile = this.state.instruments[audioID]
    const source = this.state.audioCTX.createBufferSource();
    const request = new XMLHttpRequest();

    request.open('GET', `api/files/${audioFile}`, true);

    request.responseType = 'arraybuffer';

    request.onload = () => {
      const audioData = request.response;
      // decodes the arraybuffer data into audio
      this.state.audioCTX.decodeAudioData(audioData, (buffer) => {
        source.buffer = buffer;
        source.connect(this.state.audioCTX.destination);
      },
      (e) => { `Error decoding audio data: ${e.err}` });
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

  // creates a new recording instance
  startRecord() {
    console.log('starting recording');
    // a nested array is initialized with the current time
    const startTime = new Date().getTime();
    // first element of the nested array is initialized with defaults
      // format: [trackID, soundName, beatID, timeStamp]
    this.setState({
      recordedBeat: [[0, '', -1, startTime]],
      recording: true,
    });
  }

  recordTapHandler(tapID) {
    const offsetTime = new Date().getTime() - this.state.recordedBeat[0][3];
    // sets the recorded array concatinated with the offset time and activated sound
    // format: [trackID, soundName, beatID, timeStamp]
    this.setState({
      recordedBeat: this.state.recordedBeat.concat([[
        0,
        this.state.instruments[tapID],
        tapID,
        offsetTime
      ]]),
    });
  }

  stopRecord() {
    this.setState({ recording: false });
    console.log('stopped recording')
  }

  clearRecord() {
    console.log('clearing recording')
    this.setState({
      recording: false,
      recordedBeat: [],
    });
  }

  // starts playing the recorded track
  playTrack() {
    // need to nest this so I don't have to use a janky state iterator
    let i = 1;

    // plays each nested array 'note' in the track sequentially over time
    const playTrackBeat = () => {
      const t = this.state.startTime;
      // ref for recordedBeat format: [trackID, soundName, beatID, timeStamp]
      if (this.state.recordedBeat[i][3] <= new Date().getTime() - t) {
        this.getAudio(this.state.recordedBeat[i][2]);
        // stops the recording at the end of song
        if (this.state.recordedBeat.length <= i + 1) {
          console.log ('end of song');
          clearInterval(this.state.interCode);
        }
        i += 1;
        this.setState({
          trackPos: i,
        });
      }
    };

    const initTrack = () => {
      console.log('playing recorded track')
      if (this.state.recordedBeat) {
        const startTime = new Date().getTime();
        const interCode = setInterval(playTrackBeat, 1);
        this.setState({ interCode, startTime });
      }
    };
    initTrack();
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
        recordedBeat: response.beatData,
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
