import React from 'react';
import './MapView.css';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import HeaderBuy from '../Header/HeaderBuy';

class MapView extends React.Component {
  render() {
    const sampleItem = {
      title: "Small Wooden Dining Table",
      description: "A small wooden dining table.",
      properties: {
        color: "Brown",
        distance: "0.2 mi",
        size: "2.1 ft x 6.3 ft x 4.2 ft",
        elevation: "112 ft UP 52 ft DOWN"
      }
    };

    return (
      <div id="container">
        <HeaderBuy />
        <div id="map-container">
          <div id="sidebar">
            <Sidebar
              items={[sampleItem]}
            />
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
