import React, { Component } from 'react';

const TapControl = props => (
  <div className="tap-control">
    <button
      className={props.recording ? 'grey-out' : ''}
      onClick={props.startRecord}
    >
      Start Recording
    </button>
    <button
      className={props.recording ? '' : 'grey-out'}
      onClick={props.recording ? props.stopRecord : ''}
    >
      Stop Recording
    </button>
    <button
      className={props.recording && (props.trackData || props.dubData) ? '' : 'grey-out'}
      onClick={props.recording || props.trackData || props.dubData ? props.playTrack : ''}
    >
      Play Track
    </button>
    <button
      className={userId && (props.trackData || props.dubData) ? '' : 'grey-out'}
      onClick={userId && (props.trackData || props.dubData) ? props.saveRecord : ''}
    >
      Save Track
    </button>
    <input
      type="text"
      name="trackName"
      value={props.trackName}
      placeholder="My New Track"
      onChange={props.updateTrackName}
    />
    <button
      className={props.trackData ? '' : 'grey-out'}
      onClick={props.trackData ? props.editTrack : ''}
    >
      Overdub Track
    </button>
    <button
      className={props.trackData || props.dubData ? '' : 'grey-out'}
      onClick={props.clearRecord}
    >
      Clear all tracks
    </button>
    <button
      className={props.dubData ? '' : 'grey-out'}
      onClick={props.clearDub}
    >
      Clear Dub Track
    </button>
    <button
      className={props.trackData && props.dubData ? '' : 'grey-out'}
      onClick={props.mergeDub}
    >
      Merge Dub into Master
    </button>


  </div>
);

export default TapControl;
