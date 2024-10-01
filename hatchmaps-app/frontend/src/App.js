import * as React from 'react';
import { useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import {
  willametteAtCorvallis,
  willametteBelowFalls,
  mfWillametteAboveSnakeCreek,
  mckenzieAboveSouthFork,
  mckenzieAboveHaydenBridge,
  mckenzieNearCoburg,
  metoliusNearGrandview
} from './data/Data';
const siteList = [
  willametteAtCorvallis,
  willametteBelowFalls,
  mfWillametteAboveSnakeCreek,
  mckenzieAboveSouthFork,
  mckenzieAboveHaydenBridge,
  mckenzieNearCoburg,
  metoliusNearGrandview,
];

const allTemps = () => {
  const [temps, settemps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5933/temps')
    .then(response => {
      settemps(response.data);
    })
    .catch(error => {
      console.error('error fetching temps:', error);
    });
  }, []);
};

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

      console.log(Sites);

    {showPopup &&
      siteList.map((site) => (
        <Popup
          key={site.id} // Always add a unique key when rendering lists in React
          longitude={site.long}
          latitude={site.lat}
          anchor="top"
          onClose={() => setShowPopup(false)}
        >
          <div className="card">
            <label>{site.name}</label>
            <label>Body of Water: {site.bodyOfWater.name}</label>
          </div>
          You are here
        </Popup>
      ))
    };
    </Map>
  );
}
export default App;
