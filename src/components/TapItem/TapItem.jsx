import React, { Component } from 'react';
import './TapItem.css'

class TapItem extends Component {

  // creates a list of avaliable sounds to choose from, and sets it when selected
  listSounds() {
    return this.props.audioList.map((sound, i) =>
        <a href=""
          key={`menuItem${i}`}
          className="list-item"
          onClick={() => this.props.selectInstrument(sound.name, this.props.id)}
        >{sound.name}</a>
      );
  }

  render() {
    return (
      <div className="tap-item">
        {this.listSounds()}
        <a> testing 123 </a>
      </div>
    );
  }
}

export default TapItem;
