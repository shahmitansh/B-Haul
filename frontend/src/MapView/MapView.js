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

  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
    this.distanceSet = false;
  }

  componentDidMount(){
    const reqPics = require.context('./mock', true, /\.jpg$/)
    const paths = reqPics.keys()

    fetch('http://localhost:3000/getProductList')
      .then(res => res.json())
      .then(result => this._processListings(result));
  }

  _processListings(rawListings) {
    // Example product
    // {
    //   title: "Small Wooden Dining Table",
    //   description: "A small wooden dining table.",
    //   image: table6,
    //   productID: 13,
    //   sellerID: 15,
    //   location: {
    //     lat: 34.070040,
    //     lng: -118.453400
    //   },
    //   properties: {
    //     color: "Mocha",
    //     distance: "",
    //     size: "2.1 ft x 6.3 ft x 4.2 ft",
    //     elevation: ""
    //   }
    // }

    let productList = Object.values(rawListings['products']);
    let tempListings = [];

    for (let product of productList) {
      tempListings.push({
        title: product.name,
        description: product.description,
        image: table1,
        location: product.location,
        productID: product.productID,
        sellerID: product.sellerID,
        properties: {
          type: product.type,
          color: product.color,
          distance: '',
          size: product.size,
          elevation: product.elevation
        }
      });
    }

    this.setState({listings: tempListings});
  }

  _computeDistances() {
    const _distanceHelper = (url, index) => {
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState(state => {
            const tempListings = state.listings;
            tempListings[index].properties.distance = result.distance[1].toString() + ' mi';
            return {listings: tempListings};
          });
        });
    };

    const currentListings = this.state.listings;
    let index = 0;
    for (let listing of currentListings) {
      const distance_url = 'https://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&json={locations:[%20{%20latLng:{%20lat:' + this.props.userLat + ',%20lng:' + this.props.userLng +'%20}%20},%20{%20latLng:{%20lat:' + listing.location.lat + ',%20lng:'+ listing.location.lng + '}%20}%20],%20options:{%20manyToOne:true%20}}';
      _distanceHelper(distance_url, index);
      index++;
    }
  }

  _computeElevations() {
    const _elevationHelper = (url, index) => {
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState(state => {
            const tempListings = state.listings;
            tempListings[index].properties.elevation = result.elevationProfile[1].height.toString() + ' m';
            return {listings: tempListings};
          });
        });
    }

    const currentListings = this.state.listings;
    let index = 0;
    for (let listing of currentListings) {
      const elevation_url = 'http://open.mapquestapi.com/elevation/v1/profile?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&shapeFormat=raw&latLngCollection=' + this.props.userLat + ',' + this.props.userLng + ',' + listing.location.lat + ',' + listing.location.lng;
      _elevationHelper(elevation_url, index);
      index++;
    }
  }

  render() {
    const items = this.state.listings;
    if (!this.distanceSet && items.length > 0 && this.props.userLat != undefined && this.props.userLng != undefined) {
      this.distanceSet = true;
      this._computeDistances();
      this._computeElevations();
    }

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
