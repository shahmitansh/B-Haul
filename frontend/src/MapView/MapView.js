import React from 'react';
import './MapView.css';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import HeaderBuy from '../Header/HeaderBuy';

class MapView extends React.Component {
  render() {
    return (
      <div id="container">
        <HeaderBuy />
        <div id="map-container">
          <div id="sidebar">
            <Sidebar />
          </div>
          <div id="map">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

export default MapView;
