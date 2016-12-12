import React, { Component } from 'react';
import './TapList.css';
import TapItem from '../TapItem/TapItem';

class TapList extends Component {

  renderTapZones() {
    return this.props.instruments.map((instrument, i) =>
      <div
        key={i}
        instrument={instrument}
        className="tap-zone"
        background-color="red"
      >
        <TapItem
          key={i}
          className="tap-item"
          instrument={instrument}
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
