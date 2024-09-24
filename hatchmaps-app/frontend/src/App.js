import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map //All this taken from documentation
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        latitude: 44.44667,
        longitude: -121.69472,
        zoom: 14
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
export default App;
