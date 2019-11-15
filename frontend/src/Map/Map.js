import React from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import axios from 'axios';

import ListingPin from './ListingPin';
import UserPin from './UserPin';

class Map extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 34.0699,
      longitude: -118.4462,
      zoom: 14.3
    },
    // distance: 0
  };

  onViewportChange = viewport => {
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  }

  _renderListingMarker = (listing, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={listing.location.lng} latitude={listing.location.lat}>
        <ListingPin number={index+1} />
      </Marker>
    )
  }

  _renderUserMarker = (lat, lng) => {
    return (
      <Marker longitude={lng} latitude={lat}>
        <UserPin />
      </Marker>
    );
  }

  // computeDistance =(userLats, userLngs, itemLat, itemLng) => {
  //   const url = 'https://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&json={locations:[%20{%20latLng:{%20lat:' + userLats + ',%20lng:' + userLngs +'%20}%20},%20{%20latLng:{%20lat:' + itemLat + ',%20lng:'+ itemLng + '}%20}%20],%20options:{%20manyToOne:true%20}}'
  //   console.log(url)
  //   axios.get(url)
  //     .then(response => 
  //       {
  //         console.log(response, 'resp')
  //         this.setState({distance: response.data.distance[1]})
  //         console.log(this.state.distance, 'dist')
  //       })
  // }

  render () {
    const {
      viewport,
    } = this.state

    const [userLat, userLng] = [this.props.userLat, this.props.userLng];
    
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic2FuMmhlZyIsImEiOiJjazJ2ZTV1OHgwNDZsM2xwbXo0OW94OXYwIn0.ZJhWsB8tTaDvzdI-zILksQ"}
        onViewportChange={viewport => this.onViewportChange(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* <div> <button onClick={this.computeDistance(userLat, userLng, lat[0], lng[0])}> Click Me! </button></div> */}
        {/* <a> {this.state.distance} </a> */}
        {this.props.items.map(this._renderListingMarker)}
        {(userLat && userLng) && this._renderUserMarker(userLat, userLng)}
      </ReactMapGL>
    )
  }
}
// http://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8
// http://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&json=locations:[%20{%20latLng:{%20lat:40.3612,%20lng:-76.794%20}%20},%20{%20latLng:{%20lat:40.3021,%20lng:-76.9463}%20}%20],%20options:{%20allToAll:true%20}}
// http://www.mapquestapi.com/directions/v2/routematrix?key=aGF9qhMVGLXeMA5UGCdSZt7rIIp600r8&json={locations:[%20{%20latLng:{%20lat:40.3612,%20lng:-76.794%20}%20},%20{%20latLng:{%20lat:40.3021,%20lng:-76.9463}%20}%20],%20options:{%20manyToOne:true%20}}
export default Map;