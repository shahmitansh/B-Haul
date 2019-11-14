import React from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

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
    }
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
        {this.props.items.map(this._renderListingMarker)}
        {(userLat && userLng) && this._renderUserMarker(userLat, userLng)}
      </ReactMapGL>
    )
  }
}

export default Map;
