import React, { Component } from 'react';
import './TapItem.css'

class TapItem extends Component {

  // creates a list of avaliable sounds to choose from, and sets it when selected
  listSounds() {
    return this.props.audioList.map((sound, i) =>
        <button
          key={i}
          className="list-item"
          onClick={() => this.props.selectInstrument(sound.name, this.props.id)}
        >{sound.name}</button>
      );
  }

  render() {
    return (
      <div className="tap-item">
        {this.listSounds()}
      </div>
    );
  }
}

export default TapItem;
