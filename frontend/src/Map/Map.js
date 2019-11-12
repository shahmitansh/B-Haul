import React from 'react';
import ReactMapGL from 'react-map-gl';

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

  render () {
    const {
      viewport,
    } = this.state
    return (
      <ReactMapGL
        width='100%'
        height='100%'
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic2FuMmhlZyIsImEiOiJjazJ2ZTV1OHgwNDZsM2xwbXo0OW94OXYwIn0.ZJhWsB8tTaDvzdI-zILksQ"}
        onViewportChange={viewport => this.onViewportChange(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    )
  }
}

export default Map;
