import React, { Component } from 'react';

const TapControl = props => (
  <div className="tap-control">
    <button
      className="start-button"
      onClick={props.startRecord}
    >
      Start Recording
    </button>
    <button
      className="stop-button"
      onClick={props.stopRecord}
    >
      Stop Recording
    </button>
    <button
      className="play-button"
      onClick={props.playTrack}
    >
      Play Track
    </button>
    <button
      className="save-button"
      onClick={props.saveRecord}
    >
      Save Track
    </button>
    <input
      className="new-track-name"
      type="text"
      name="trackName"
      value={props.trackName}
      placeholder="My New Track"
      onChange={props.updateTrackName}
    />
    <button
      className="save-button"
      onClick={props.editTrack}
    >
      Overdub Track
    </button>
    <button
      className="save-button"
      onClick={props.clearRecord}
    >
      Clear all tracks
    </button>
    <button
      className="save-button"
      onClick={props.clearDub}
    >
      Clear Dub Track
    </button>


  </div>
);

export default TapControl;
