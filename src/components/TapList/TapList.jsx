import React, { Component } from 'react';
import './TapList.css';
import TapItem from '../TapItem/TapItem';

class TapList extends Component {
  // if the button is clicked, it drops down a list of user-selectable sounds
  renderTapZones() {
    const fingerprints = ['url(http://i.imgur.com/9D5UU99.png)', 'url(http://i.imgur.com/USjeDxe.png)', 'url(http://i.imgur.com/oiXKjQY.png)', 'url(http://i.imgur.com/w3rpGob.png)', 'url(http://i.imgur.com/DmmUoN1.png)'];
    return this.props.instruments.map((instrument, i) =>
      <div>
        <div
          key={i}
          className="tap-zone"
          style={{ backgroundColor: (this.props.padTriggered[i] ? '#cdd422' : '#8B370D'),
            backgroundImage: fingerprints[i]
          }}
          onClick={() => this.props.triggerSound(i)}
        >
          <button
            style={{backgroundColor: '#cdd422'}}
            className="drop-sounds"
            onClick={() => this.props.toggleSoundMenu(i)}
          />
          <div>
            <TapItem
              key={i}
              className="tap-item"
              instrument={this.instrument}
              selectInstrument={this.props.selectInstrument}
              audioList={this.props.audioList}
            />
          </div>

        </div>
        <div className={this.props.toggleMenu[i] ? "sound-menu drop" : "sound-menu hidden"} />
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
