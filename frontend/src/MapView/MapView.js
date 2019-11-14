import React from 'react';
import './MapView.css';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import HeaderBuy from '../Header/HeaderBuy';

class MapView extends React.Component {
  render() {
    const sampleItem1 = {
      title: "Small Wooden Dining Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.067138,
        lng: -118.451128
      },
      properties: {
        color: "Brown",
        distance: "0.3 mi",
        size: "2.1 ft x 6.3 ft x 4.2 ft",
        elevation: "112 ft UP 52 ft DOWN"
      }
    };

    const sampleItem2 = {
      title: "Big Wooden Dining Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.067370,
        lng: -118.452740
      },
      properties: {
        color: "Black",
        distance: "0.2 mi",
        size: "8.1 ft x 3.3 ft x 5.2 ft",
        elevation: "12 ft UP 5 ft DOWN"
      }
    };

    const sampleItem3 = {
      title: "Cute Coffee Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.066280,
        lng: -118.450370
      },
      properties: {
        color: "Blue",
        distance: "0.5 mi",
        size: "3.1 ft x 4.3 ft x 3.2 ft",
        elevation: "133 ft UP 25 ft DOWN"
      }
    };

    const sampleItem4 = {
      title: "TV Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.068740,
        lng: -118.447560
      },
      properties: {
        color: "White",
        distance: "0.4 mi",
        size: "2.1 ft x 6.3 ft x 4.2 ft",
        elevation: "112 ft UP 52 ft DOWN"
      }
    };

    const sampleItem5 = {
      title: "Small Wooden Dining Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.064150,
        lng: -118.452730
      },
      properties: {
        color: "Coffee",
        distance: "0.3 mi",
        size: "2.1 ft x 6.3 ft x 4.2 ft",
        elevation: "112 ft UP 52 ft DOWN"
      }
    };

    const sampleItem6 = {
      title: "Small Wooden Dining Table",
      description: "A small wooden dining table.",
      location: {
        lat: 34.070040,
        lng: -118.453400
      },
      properties: {
        color: "Mocha",
        distance: "0.1 mi",
        size: "2.1 ft x 6.3 ft x 4.2 ft",
        elevation: "112 ft UP 52 ft DOWN"
      }
    };

    const items = [sampleItem1, sampleItem2, sampleItem3, sampleItem4, sampleItem5, sampleItem6];

    return (
      <div id="container">
        <HeaderBuy />
        <div id="map-container">
          <div id="sidebar">
            <Sidebar
              items={items}
            />
          </div>
          <div id="map">
            <Map
              items={items}
              userLat={this.props.userLat}
              userLng={this.props.userLng}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapView;
