import React, { Component } from 'react';

class TapItem extends Component {

  

  render() {
    return (
      <div className="tap-item">
        <div className="drop-menu">
          <button
            className="drop-sounds"
            onClick={props.dropSoundMenu}
          >Select an instrument</button>
          <div className="drop-content">
            {props.soundMenuList}
          </div>
        </div>
      </div>
      )
    }
}

export default TapItem;
