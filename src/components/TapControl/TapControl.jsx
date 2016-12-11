import React, { Component } from 'react';

const TapControl = props => (
  <div className="tap-control">
    <button
      className="start-button"
      onClick={() => props.startRecord()}
    >
      Start Recording
    </button>
    <button
      className="stop-button"
      onClick={() => props.stopRecord()}
    >
      Stop Recording
    </button>
    <button
      className="save-button"
      onClick={() => props.saveRecord()}
    >
      Save Track
    </button>
    <input
      className="new-track-name"
      type="text"
      name="trackName"
      value=""
      placeholder="My New Track"
      onChange={props.updateTrackName}
    />
  </div>
);

export default TapControl;
