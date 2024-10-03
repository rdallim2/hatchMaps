import * as React from 'react';
import { useState, useEffect } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { sites } from './data/Data';

function App() {
  const [temps, settemps] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 44.6262275,
    longitude: -121.4839433,
    zoom: 14,
  });
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5933/temps')
    .then(response => {
      settemps(response.data);
      console.log("Temps properly fetched from backend.");
    })
    .catch(error => {
      console.error('error fetching temps:', error);
    });
  }, []);

  const updateSites = temps.map(temp => {
    const matchingSite = sites[temp.idNum];
    if (matchingSite){
      return {
        ...matchingSite,
        temp: temp.temp,
        recentLogTime: temp.dateTime
      };
    }

    return null;
  });

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
      updateSites.map((site) => (
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
            <label>Recent Log Time: {site.recentLogTime}</label>
            <label>Temperature: {site.temp}</label>
          </div>
          You are here
        </Popup>
      ))
    };
    </Map>
  );
}
export default App;
