import React, { Component } from 'react';
// import { Component } from 'react-router-dom';
import './App.css';
import Main from './Main/Main.js';

import { geolocated } from 'react-geolocated';

export class App extends Component {
  render() {
    if (!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled || !this.props.coords) {
      return <Main />
    }

    return <Main userLat={this.props.coords.latitude} userLng={this.props.coords.longitude} />
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(App);
