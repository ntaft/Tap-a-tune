import React from 'react';

const SavedTrackItem = props => (
  <div className="saved-item">
    <h3>{props.trackName}</h3>
    <button
      className="load"
      onClick={() => props.loadTrack(props.id)}
    >Load Track</button>
    <button
      className="delete"
      onClick={() => props.deleteTrack(props.id)}
    >Delete Track</button>
  </div>
  );

export default SavedTrackItem;
