import React from 'react';
import './MapView.css';
import PropTypes from 'prop-types';

import axios from 'axios';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import HeaderBuy from '../Header/HeaderBuy';

import ITEM_SCHEMA from '../items.json';
import queryString from 'query-string';

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
      listings: [],
      globalFilters: this._initGlobalFilters()
    };
    this.state.localFilters = this._initLocalFilters(this.state.globalFilters.type.current);
    console.log(this.state);
    this.distanceSet = false;
  }

  imageURL = 'https://skypic.attic.city/?bucket=cdn.attic.city&key=items/9f3cc7dcf926d6adb92eb4eedf21bfaeface62ebe4b6a6d92fcdb44b2d242de3-w670h705q75fit.jpeg';

  componentDidMount(){
    console.log(this.props.location);
    const reqPics = require.context('./mock', true, /\.jpg$/)
    const paths = reqPics.keys()

    const fetchUrl = `https://bhaulucla.herokuapp.com/getProductList/filtered${this.props.location.location.search}`;
    console.log(fetchUrl);
    fetch(fetchUrl)
      .then(res => res.json())
      .then(result => this._processListings(result));
  }

  _initGlobalFilters() {
    let res = {};
    const params = queryString.parse(this.props.location.location.search);
    for (let filter of ITEM_SCHEMA.globalFilters) {
      const queryFilter = params[filter.filterName];
      res[filter.filterName] = {
        ...filter,
        current: queryFilter != undefined && this._verifyFilterFormat(queryFilter, filter.filterType, filter.filterOptions) ? queryFilter : filter.defaultOption
      };
    }
    return res;
  }

  _initLocalFilters(type) {
    type = type.toLowerCase();

    if (type === 'all' || !(type in ITEM_SCHEMA.categories)) {
      return {};
    }

    let res = {};
    const params = queryString.parse(this.props.location.location.search);
    for (let filter of ITEM_SCHEMA.categories[type].localFilters) {
      const dashFilterName = `_${filter.filterName}`
      const queryFilter = params[dashFilterName];
      res[filter.filterName] = {
        ...filter,
        current: queryFilter != undefined && this._verifyFilterFormat(queryFilter, filter.filterType, filter.filterOptions) ? queryFilter : filter.defaultOption
      };
    }
    return res;
  }

  _verifyFilterFormat(value, type, options) {
    if (type == 'number') {
      const arr = value.split(',');
      return arr.length == 2 &&
             !isNaN(arr[0]) &&
             !isNaN(arr[1]) &&
             Number(arr[0]) <= Number(arr[0]) &&
             Number(arr[0]) >= options[0] &&
             Number(arr[1]) <= options[1];
    } else if (type == 'dropdown') {
      const lowerCaseOptions = options.map(x => x.toLowerCase());
      return value == 'all' || lowerCaseOptions.includes(value.toLowerCase());
    }
    return true;
  }

  _processListings(rawListings) {
    // Example product:
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
    console.log(productList, 'productList')
    //no image
    let tempListings = [];

    for (let product of productList) {
      tempListings.push({
        title: product.name,
        description: product.description,
        // image: product.image,
        // image URL not posting correctly
        imageURL: product.imageURL,
        location: product.location,
        productID: product.productID,
        sellerID: product.sellerID,
        properties: {
          price: product.price,
          type: product.type,
          color: product.color,
          distance: '',
          size: product.size,
          elevation: product.elevation
        }
      });
      console.log(tempListings, 'all listings')
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
      const distance_url = 'https://www.mapquestapi.com/directions/v2/routematrix?key=aEYU2G6Ah30Jm0SmggIOtfu2qhQGD74P&json={locations:[%20{%20latLng:{%20lat:' + this.props.userLat + ',%20lng:' + this.props.userLng +'%20}%20},%20{%20latLng:{%20lat:' + listing.location.lat + ',%20lng:'+ listing.location.lng + '}%20}%20],%20options:{%20manyToOne:true%20}}';
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
            if (result.elevationProfile.length > 0) {
              tempListings[index].properties.elevation = result.elevationProfile[1].height.toString() + ' m';
            }
            return {listings: tempListings};
          });
        });
    }

    const currentListings = this.state.listings;
    let index = 0;
    for (let listing of currentListings) {
      const elevation_url = 'http://open.mapquestapi.com/elevation/v1/profile?key=aEYU2G6Ah30Jm0SmggIOtfu2qhQGD74P&shapeFormat=raw&latLngCollection=' + this.props.userLat + ',' + this.props.userLng + ',' + listing.location.lat + ',' + listing.location.lng;
      _elevationHelper(elevation_url, index);
      index++;
    }
  }

  render() {
    const items = this.state.listings;
    // console.log(items, 'items')
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
              globalFilters={this.state.globalFilters}
              localFilters={this.state.localFilters}
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

MapView.propTypes = {
  /**
   * Longitude value for user location.
   */
  userLng: PropTypes.number.isRequired,
  /**
   * Latitude value for user location.
   */
  userLat: PropTypes.number.isRequired,
  /**
   * Object that stores URL location data, including query params and pathname.
   */
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string
  })
}

MapView.defaultProps = {
  userLng: undefined,
  userLat: undefined,
  location: {}
}

export default MapView;
