import React from 'react';
import './MapView.css';

import axios from 'axios';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import HeaderBuy from '../Header/HeaderBuy';

import table1 from './mock/table1.jpg';
import table2 from './mock/table2.jpg';
import table3 from './mock/table3.jpg';
import table4 from './mock/table4.jpg';
import table5 from './mock/table5.jpg';
import table6 from './mock/table6.jpg';

class MapView extends React.Component {
  state = {
    distance: 0
  }

  userLat = this.props.userLat;
  userLng = this.props.userLng;

  sampleItem1 = {
    title: "Small Wooden Dining Table",
    description: "A small wooden dining table.",
    image: table1,
    location: {
      lat: 34.067138,
      lng: -118.451128
    },
    properties: {
      color: "Brown",
      distance: "",
      size: "2.1 ft x 6.3 ft x 4.2 ft",
      elevation: "112 ft UP 52 ft DOWN"
    }
  };

  sampleItem2 = {
    title: "Big Wooden Dining Table",
    description: "A small wooden dining table.",
    image: table2,
    location: {
      lat: 34.067370,
      lng: -118.452740
    },
    properties: {
      color: "Black",
      distance: "",
      size: "8.1 ft x 3.3 ft x 5.2 ft",
      elevation: "12 ft UP 5 ft DOWN"
    }
  };

  sampleItem3 = {
    title: "Cute Coffee Table",
    description: "A small wooden dining table.",
    image: table3,
    location: {
      lat: 34.066280,
      lng: -118.450370
    },
    properties: {
      color: "Blue",
      distance: "",
      size: "3.1 ft x 4.3 ft x 3.2 ft",
      elevation: "133 ft UP 25 ft DOWN"
    }
  };

  sampleItem4 = {
    title: "TV Table",
    description: "A small wooden dining table.",
    image: table4,
    location: {
      lat: 34.068740,
      lng: -118.447560
    },
    properties: {
      color: "White",
      distance: "",
      size: "2.1 ft x 6.3 ft x 4.2 ft",
      elevation: "112 ft UP 52 ft DOWN"
    }
  };

  sampleItem5 = {
    title: "Small Wooden Dining Table",
    description: "A small wooden dining table.",
    image: table5,
    location: {
      lat: 34.064150,
      lng: -118.452730
    },
    properties: {
      color: "Coffee",
      distance: "",
      size: "2.1 ft x 6.3 ft x 4.2 ft",
      elevation: "112 ft UP 52 ft DOWN"
    }
  };

  sampleItem6 = {
    title: "Small Wooden Dining Table",
    description: "A small wooden dining table.",
    image: table6,
    location: {
      lat: 34.070040,
      lng: -118.453400
    },
    properties: {
      color: "Mocha",
      distance: "",
      size: "2.1 ft x 6.3 ft x 4.2 ft",
      elevation: "112 ft UP 52 ft DOWN"
    }
  };

  items = [this.sampleItem1, this.sampleItem2, this.sampleItem3, this.sampleItem4, this.sampleItem5, this.sampleItem6];

  lat = [];
  lng = [];

  computeDistance =() => {
    setTimeout(() => {
      for(var i = 0; i < this.items.length; i++) {
        this.compute_helper(i)
      }
    }, 5000)
  }

  compute_helper =(loop) => {
    const userLats = this.props.userLat
    const userLngs = this.props.userLng
    this.lat.push(this.items[loop].location.lat)
    this.lng.push(this.items[loop].location.lng)
    var itemLat=this.lat[loop]
    var itemLng=this.lng[loop]
    const url = 'https://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&json={locations:[%20{%20latLng:{%20lat:' + userLats + ',%20lng:' + userLngs +'%20}%20},%20{%20latLng:{%20lat:' + itemLat + ',%20lng:'+ itemLng + '}%20}%20],%20options:{%20manyToOne:true%20}}'

    axios.get(url)
      .then(response =>
        {
          this.items[loop].properties.distance = response.data.distance[1].toString() + " mi"
          this.setState({distance: this.items[loop].properties.distance})
        }
      )
  }

  componentDidMount(){
    this.computeDistance()
    const reqPics = require.context('./mock', true, /\.jpg$/)
    const paths = reqPics.keys()
  }

  render() {
    const items = this.items;

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
