import React, { Component } from 'react';
import './TapList.css';
import TapItem from '../TapItem/TapItem';

class TapList extends Component {
  // if the button is clicked, it drops down a list of user-selectable sounds
  renderTapZones() {
    const fingerprints = ['url(http://i.imgur.com/9D5UU99.png)', 'url(http://i.imgur.com/USjeDxe.png)', 'url(http://i.imgur.com/oiXKjQY.png)', 'url(http://i.imgur.com/w3rpGob.png)', 'url(http://i.imgur.com/DmmUoN1.png)'];
    return this.props.instruments.map((instrument, i) =>
      <div
        key={i}
        className="tap-zone"
        style={{ backgroundColor: 'rgb(200, 200, 200)', backgroundImage: fingerprints[i] }}
        onClick={() => this.props.triggerSound(i)}
        >
        <button
          style={{backgroundColor: 'transparent'}}
          className="drop-sounds"
          onClick={() => this.props.toggleSoundMenu(i)}
        ></button>
        <div className={this.props.toggleMenu[i] ? "sound-menu drop" : "sound-menu hidden"} >
          <TapItem
            key={i}
            id={i}
            className="tap-item"
            instrument={this.instrument}
            selectInstrument={this.props.selectInstrument}
            audioList={this.props.audioList}
          />
        </div>
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
