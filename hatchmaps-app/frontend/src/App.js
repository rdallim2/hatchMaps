import * as React from 'react';
import { useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function App() {
  const [viewState, setViewState] = useState({
    latitude: 44.6262275,
    longitude: -121.4839433,
    zoom: 14,
  });
  const [showPopup, setShowPopup] = useState(true);

  return (
    <Map //All this taken from documentation
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      {...viewState}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/rdallim2/cm1ibsts6000h01rb81k7efth"
      onMove={(evt) => setViewState(evt.viewState)} // Update view state including zoom
    >
      <Marker
        longitude={-121.4839433} // Marker longitude
        latitude={44.6262275} // Marker latitude
        anchor="bottom" // Anchor position
      >
        {/* Use LocationOnIcon as the marker */}
        <LocationOnIcon
          style={{fontSize: viewState.zoom * 4, color: "red"}} // Customize icon color
        />
      </Marker>
      {showPopup && (
      <Popup longitude={-121.4839433} latitude={44.6262275}
        anchor="top"
        onClose={() => setShowPopup(false)}>
          <div className="card">
            <label>Body of Water: </label>
            <label></label>
          </div>
        You are here
      </Popup>)}
    </Map>
  );
}
export default App;
