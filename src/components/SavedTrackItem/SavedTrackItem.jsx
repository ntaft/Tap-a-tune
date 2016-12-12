import React from 'react';

const SavedTrackItem = props => (
  <div className="saved-item">
    <h3>{props.trackName}</h3>
    <button
      className="load"
      key={props.key}
      id={props.id}
      onClick={props.loadTrack()}
    >Load Track</button>
    <button
      className="delete"
      key={props.key}
      id={props.id}
      onClick={props.deleteTrack()}
    >Delete Track</button>
  </div>
  );

export default SavedTrackItem;
