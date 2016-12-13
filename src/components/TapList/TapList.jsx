import React, { Component } from 'react';
import './TapList.css';
import TapItem from '../TapItem/TapItem';

class TapList extends Component {
  // if the button is clicked, it drops down a list of user-selectable sounds
  renderTapZones() {
    return this.props.instruments.map((instrument, i) =>
      <div className="tap-zone">
        <button
          className="drop-sounds"
          onClick={() => this.props.toggleSoundMenu(i)}
        >Select an instrument</button>
        <TapItem
          key={i}
          id={i}
          instrument={this.instrument}
          className={this.props.toggleMenu[i] ? 'sound-menu drop' : 'sound-menu'}
          selectInstrument={this.props.selectInstrument}
          audioList={this.props.audioList}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTapZones()}
      </div>
    );
  }
}

export default TapList;
