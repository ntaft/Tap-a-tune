import React, { Component } from 'react';

class TapItem extends Component {

  listSounds() {
    this.props.audioList.map((sound, i) => {
      return (
        <button
          key={i}
          tapZoneKey={this.props.key}
          setInstrument={sound.name}
          className="list-item"
          onClick={this.props.selectInstrument}
        >
          <span>{sound.name}</span>
        </button>
      )
    })
  }

  render() {
    return (
      <div className="tap-item">
        <div className="drop-menu">
          <button
            className="drop-sounds"
            onClick={props.dropSoundMenu}
          >Select an instrument</button>
          <div className="drop-content">
            {this.listSounds()}
          </div>
        </div>
      </div>
      )
    }
}

export default TapItem;
