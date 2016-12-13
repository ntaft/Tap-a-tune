import React, { Component } from 'react';
import './TapItem.css'

class TapItem extends Component {

  // creates a list of avaliable sounds to choose from, and sets it when selected
  listSounds() {
    return this.props.audioList.map((sound, i) =>
      <div
        key={i}
        className="drop-content"
      >
        <button
          className="list-item"
          onClick={() => this.props.selectInstrument(sound.name, this.props.id)}
        >{sound.name}</button>
      </div>
      );
  }

  render() {
    return (
      <div className="drop-menu">
        {this.listSounds()}
      </div>
    );
  }
}

export default TapItem;
