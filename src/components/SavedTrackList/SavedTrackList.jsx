import React, { Component } from 'react';
import SavedTrackItem from '../SavedTrackItem/SavedTrackItem';

class SavedTrackList extends Component {

  // componentDidUpdate(prevProps) {
  //   if (prevProps.savedTracks !== this.props.savedTracks) {
  //     this.renderSavedList();
  //   }
  // }

  renderSavedList() {
    if (this.props.savedTracks.length > 0) {
      return this.props.savedTracks.map((track, i) =>
        <SavedTrackItem
          key={i}
          id={track.id}
          trackName={track.track_name}
          instruments={track.instruments}
          loadTrack={this.props.loadTrack}
          deleteTrack={this.props.deleteTrack}
        />
      );
    }
  }

  render() {
    return (
      <div className="saved">
        <h2>Saved Tracks</h2>
        {this.renderSavedList()}
      </div>
    );
  }
}

export default SavedTrackList;
