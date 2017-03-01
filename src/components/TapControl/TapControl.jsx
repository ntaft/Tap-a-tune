import React, { Component } from 'react';
import './TapControl.css'

const TapControl = props => (
  <div className="tap-control">
    <div className="recording-container">
      <button
        className={props.recording ? "grey-out" : ""}
        onClick={props.startRecord}
      >
        <img src="https://s3.amazonaws.com/tappity/img/play-button.svg"/>
        Start Recording
      </button>
      <button
        className={props.recording ? "" : "grey-out"}
        onClick={props.recording ? props.stopRecord : ""}
      >
        Stop Recording
      </button>
      <button
        className={!(props.recording) && (props.trackData || props.dubData) ? "" : "grey-out"}
        onClick={!(props.recording)  && (props.trackData || props.dubData) ? props.playTrack : ""}
      >
        Play Track
      </button>
    </div>
    <div className="save-container">
      <button
        className={props.userId && (props.trackData || props.dubData) ? "" : "grey-out"}
        onClick={props.userId && (props.trackData || props.dubData) ? props.saveRecord : ""}
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
    </div>
    <div className="dub-container">
      <button
        className={!(props.recording) && props.trackData ? "" : "grey-out"}
        onClick={props.trackData ? props.editTrack : ""}
      >
        Overdub Track
      </button>
      <button
        className={!(props.recording) && props.trackData && props.dubData ? "" : "grey-out"}
        onClick={props.mergeDub}
      >
        Merge Dub into Master
      </button>
    </div>
    <div className="clrtrack-container">
      <button
        className={props.trackData || props.dubData ? "" : "grey-out"}
        onClick={props.clearRecord}
      >
        Clear all tracks
      </button>
      <button
        className={props.dubData ? "" : "grey-out"}
        onClick={props.clearDub}
      >
        Clear Dub Track
      </button>
    </div>
  </div>
);

export default TapControl;
