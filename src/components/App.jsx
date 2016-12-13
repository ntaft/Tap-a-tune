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
      loginName: '',
      loginPass: '',
      signupName: '',
      signupPass: '',
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
        // case 'r':
        //   this.startRecord();
        //   break;
        // case 't':
        //   this.stopRecord();
        //   break;
        // case 'y':
        //   this.clearRecord();
        //   break;
        // case 'e':
        //   this.playTrack();
        //   break;
        default:
          break;
      }
    });
  }

  // dynamically updates all of the login/signup forms, filters by name.
  updateAuthForms(e) {
    const value = e.target.value;
    // console.log(e.target.name, value);
    switch (e.target.name) {
      case 'loginName':
        this.setState({ loginName: value });
        break;
      case 'loginPass':
        this.setState({ loginPass: value });
        break;
      case 'signupName':
        this.setState({ signupName: value });
        break;
      // case 'signupEmail':
      //   this.setState({ signupEmail: value});
      //   break;
      case 'signupPass':
        this.setState({ signupPass: value });
        break;
      default:
        break;
    }
  }

  // passes the login data to the api
  // authenticates data with server
  // response with login and user ID
  handleLogin() {
    fetch('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginName,
        password: this.state.loginPass,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log('the response is:', response)
      if (response.id !== 'invalid') {
        this.setState({
          userId: response.id,
        });
        // saves jwt token and ID
        localStorage.id = response.id;
        localStorage.token = response.token;
      } else {
        alert('invalid login');
      }
    })
    .then(this.setState({
      loginName: '',
      loginPass: ''
    }))
    .then(console.log('logging in', localStorage.id))
    .catch(err => console.log(err));
  }
  // sends the signup data to the api server
  // encrypts new user data and saves in db
  // authenticates the response and returns the user id
  handleSignup() {
    fetch('/auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signupName,
        // email: this.state.signupEmail,
        password: this.state.signupPass,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        this.setState({
          userId: response.id,
        })
        localStorage.id = response.id;
      } else {
        alert(response.message);
      }
    })
    .then(this.setState({
      signupName: '',
      signupPass: '',
      // signupEmail: '',
    }))
    .then(console.log('signup successful'))
    .catch(err => console.log(err));
  }
  // handles logout of the user, will revert to login state
  handleLogout() {
    fetch('/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({
        id: this.state.userId,
      }),
    });
    this.setState({ userId: 0 });
    console.log('logging out');
    localStorage.token = null;
    localStorage.id = null;
  }

  // this authenticates the user on each page load
  // uses a token from local storage to verify access
  authenticateUser() {
    let token;
    if ((localStorage.getItem('token') === null)) {
      token = 'invalid';
    } else {
       token = localStorage.getItem('token')
    }
    console.log(token)
    fetch('/auth/verify', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        token: token,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      if (response.name === 'JsonWebTokenError') {
        this.setState({ userId: 0 });
        localStorage.setItem('token', null);
      } else {
        this.setState({ userId: response.id });
        localStorage.setItem('token', response.token)
      }
    })
    .catch(err => console.log(err));
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
    // first gets rid of the annoyingly large timestamp value
    const tapData = this.state.trackData;
    tapData[0][3] = 0;

    const trackObj = {
      name: this.state.recordedName,
      data: tapData,
      instruments: this.state.instruments,
      userId: this.state.userId
    }
    // saves the track to the current track list
    // const currentTracks = this.state.savedTracks;
    // currentTracks.push(trackObj)
    // this.setState({
    //   savedTracks: currentTracks
    // })

    // posts the data to the api
    fetch('/api/tracks', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: trackObj.name,
        data: trackObj.data,
        instruments: trackObj.instruments,
        userId: trackObj.userId,
      })
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      this.getSavedList();
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
      // needs to convert back to an ordered nested array
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
    let toggled = this.state.toggleMenu;
    if (toggled[id]) {
      toggled[id] = false;
    } else {
      toggled = toggled.map(i => false);
      toggled[id] = true;
    }
    console.log('toggling menu', toggled[id])
    this.setState({
      toggleMenu: toggled,
    });
  }

  triggerSound(id) {
    this.getAudio(id);
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Header
          updateAuthForms={e => this.updateAuthForms(e)}
          handleSignup={this.handleSignup.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
          loginName={this.state.loginName}
          loginPass={this.state.loginPass}
          signupName={this.state.signupName}
          signupPass={this.state.signupPass}
          handleLogout={this.handleLogout.bind(this)}
        />
        <Sidebar />
        <TapBox />
        <TapList
          audioList={this.state.audioList}
          selectInstrument={this.selectInstrument.bind(this)}
          instruments={this.state.instruments}
          toggleMenu={this.state.toggleMenu}
          toggleSoundMenu={this.toggleSoundMenu.bind(this)}
          triggerSound={this.triggerSound.bind(this)}
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
          deleteTrack={this.deleteTrack.bind(this)}
          savedTracks={this.state.savedTracks}
        />

        <Footer />
      </div>
    );
  }
}
