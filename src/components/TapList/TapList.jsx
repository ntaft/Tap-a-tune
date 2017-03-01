import React, { Component } from 'react';
import './TapList.css';
import TapItem from '../TapItem/TapItem';

class TapList extends Component {
  // if the button is clicked, it drops down a list of user-selectable sounds
  renderTapZones() {
    const fingerprints = ['url(http://i.imgur.com/9D5UU99.png)', 'url(http://i.imgur.com/USjeDxe.png)', 'url(http://i.imgur.com/oiXKjQY.png)', 'url(http://i.imgur.com/w3rpGob.png)', 'url(http://i.imgur.com/DmmUoN1.png)'];
    const colors = ['255,0,0', '0,255,0', '0,0,255', '255,255,0', '255,0,255']
    return this.props.instruments.map((instrument, i) =>
      <div className="tap-area" >

        <div className="dropdown">
          <button
            className="dropbtn"
            onClick={() => this.props.toggleSoundMenu(i)}
          >
            {this.props.instruments[i]}
          </button>
          <div className={this.props.toggleMenu[i] ? "dropdown-content show" : "dropdown-content hide"}>
              <TapItem
              key={i}
              instrument={this.instrument}
              selectInstrument={this.props.selectInstrument}
              audioList={this.props.audioList}
              />
          </div>
        </div>

        <div
          key={i}
          className={this.props.padTriggered[i] ? "tap-zone animate-up" : "tap-zone animate-down"}
          style={{ backgroundColor: (this.props.padTriggered[i] ? `rgba(${colors[i]}, 0.5)` : `rgba(${colors[i]}, 0)`)}}
          onClick={() => this.props.triggerSound(i)}
        />

      </div>

        );
  }

  render() {
    return (
      <div className="tap-container" style={{height: `${window.innerHeight - 75}px`}}>
        {this.renderTapZones()}
      </div>
    );
  }
}

export default TapList;
