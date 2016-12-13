import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TapBox from './TapBox/TapBox';
import TapControl from './TapControl/TapControl';
import TapList from './TapList/TapList';
import SavedTrackList from './SavedTrackList/SavedTrackList';
import Sidebar from './Sidebar/Sidebar';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super();

    this.state = {
      // default user id (1 for testing)
      userId: 1,
      // substantiating interface for web audio API
      audioCTX: new (window.AudioContext || window.webkitAudioContext)(),
      instruments: [
        'hihat-acoustic01',
        'kick-acoustic01',
        'snare-acoustic01',
        'clap-tape',
        'crash-acoustic'
      ],
      audioList: [],
      // buffer for audio data (may be unnecessary)
      // audioData: [0, 0, 0, 0, 0],
      // variables for recording new tracks
      trackData: [],
      recordedName: '',
      savedTracks: [],
      recording: false,
      toggleMenu: [false, false, false, false, false],
      // variables for playback of tracks
      // unnecessary unless we need to pass as props
      // trackPos: 1
    };

    // binding functions as necessary
    this.startRecord.bind(this);
    this.stopRecord.bind(this);
    this.saveRecord.bind(this);
    this.clearRecord.bind(this);
    this.recordTapHandler.bind(this);
    this.playTrack.bind(this);
    this.updateTrackName.bind(this);
    this.loadTrack.bind(this);
    this.deleteTrack.bind(this);
    this.getAudioList.bind(this);
    this.toggleSoundMenu.bind(this);
  }

  componentWillMount() {
    this.getAudioList();
  }
  componentDidMount() {
    // retrieves a saved list of all the user's songs
    this.getSavedList();
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

  // gets a list of all the audio files avaliable
  getAudioList() {
    fetch('/api/files/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      this.setState({
        audioList: response,
      })
    })
    .catch(err => console.log(err));
  }


  // gets a list of all the saved records for the given user
  getSavedList() {
    fetch(`/api/tracks/all/${this.state.userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      this.setState({
        savedTracks: response,
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
    // first element of the nested array is initialized with timestamp
      // format: [trackID, soundName, beatID, timeStamp]
    this.setState({
      trackData: [[0, 'initializing', -1, startTime]],
      recording: true,
    });
  }

  recordTapHandler(tapID) {
    const offsetTime = new Date().getTime() - this.state.trackData[0][3];
    // sets the recorded array concatinated with the offset time and activated sound
    // format: [trackID, soundName, beatID, timeStamp]
    this.setState({
      trackData: this.state.trackData.concat([[
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
      trackData: [],
    });
  }

  // starts playing the recorded track
  playTrack() {
    // need to nest this to avoid unnecessary setStates
    // starts at 1 to skip the initialized array values
    let i = 1;
    const startTime = new Date().getTime();
    let interCode = 0;

    // plays each nested array 'note' in the track sequentially over time
    const playTrackBeat = () => {
      const t = startTime;
      // ref for trackData format: [trackID, soundName, beatID, timeStamp]
      if (this.state.trackData[i][3] <= new Date().getTime() - t) {
        this.getAudio(this.state.trackData[i][2]);
        // stops the recording at the end of song
        if (this.state.trackData.length <= i + 1) {
          console.log ('end of song');
          clearInterval(interCode);
        }
        i += 1;
        // this.setState({
        //   trackPos: i,
        // });
      }
    };

    // sets the interval of the song playing
    const initTrack = () => {
      console.log('playing recorded track');
      if (this.state.trackData) {
        // note: could use multiple setIntervals if this is too slow...
        interCode = setInterval(playTrackBeat, 1);
      }
    };
    initTrack();
  }

  // saves the record to the db through our api
  saveRecord() {
    // gets rid of the annoyingly large timestamp value
    const tapData = this.state.trackData;
    tapData[0][3] = 0;
    // posts the data to the api
    fetch('/api/tracks', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.recordedName,
        data: tapData,
        instruments: this.state.instruments,
        userId: this.state.userId,
      })
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }

  // loads all the beat data from a selected track
  loadTrack(id) {
    fetch(`/api/tracks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    .then(r => r.json())
    .then((response) => {
      // needs to convert back to a nested array
      // adapted from a clever method posted here: https://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array
      const arrData = response.map(obj =>
      Object.keys(obj).map(key => obj[key]));
      this.setState({ trackData: arrData });
    })
    .catch(err => console.log(err))
  }

  deleteTrack(id) {
    fetch(`/api/tracks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      if (response.ok) {
        // remove the list item from savedTracks if successful
        const newTrackList = this.state.savedTracks.filter(track => !(track.id === id))
        this.setState({ savedTracks: newTrackList })
      }
    })
    .catch(err => console.log(err));
  }

  // changes the value of a given 'instrument' being played via user selection
  selectInstrument(name, id) {
    const newInst = this.state.instruments;
    newInst[id] = name;
    this.setState({
      instruments: newInst,
    })
  }

  toggleSoundMenu(id) {
    const toggled = this.state.toggleMenu;
    toggled[id] ? toggled[id] = false : toggled[id] = true;
    this.setState({
      toggleMenu: toggled,
    });
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Header />
        <Sidebar />
        <TapBox />
        <TapList
          audioList={this.state.audioList}
          selectInstrument={this.selectInstrument}
          instruments={this.state.instruments}
          toggleMenu={this.state.toggleMenu}
          toggleSoundMenu={this.toggleSoundMenu}
        />
        <TapControl
          startRecord={() => this.startRecord()}
          stopRecord={() => this.stopRecord()}
          playTrack={() => this.playTrack()}
          saveRecord={() => this.saveRecord()}
          updateTrackName={e => this.updateTrackName(e)}
          trackName={this.state.recordedName}
        />
        <SavedTrackList
          // there is an issue with loadTrack auto-firing
          loadTrack={this.loadTrack.bind(this)}
          deleteTrack={this.deleteTrack}
          savedTracks={this.state.savedTracks}
        />

        <Footer />
      </div>
    );
  }
}
