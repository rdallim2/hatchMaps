import * as React from 'react';
import { useState, useEffect } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { sites } from './data/Data';
import celcToFar from './functions/functions.js';

const monthNames = [
  'jan', // 0
  'feb', // 1
  'mar', // 2
  'apr', // 3
  'may', // 4
  'jun', // 5
  'jul', // 6
  'aug', // 7
  'sep', // 8
  'oct', // 9
  'nov', // 10
  'dec'  // 11
];

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
    console.log("looking for id num", temp.idNum);
    if (matchingSite){
      console.log("Found match.");
      console.log(matchingSite.lat);

      const dateString = temp.dateTime; // e.g., '07/10/97'

      console.log(dateString);
      const monthNumber = dateString.substring(0, 2); // Convert to integer

      // Get the month name
      const monthName = monthNames[monthNumber - 1]; // Adjust for zero-based index

      console.log(monthName); // Output: 'jul'
      bugsInMonth.forEach(bugName => {
        const bug = getBugByName(bugName); // Get the corresponding Bug object
        if (bug) {
          console.log(bug.hatchTemp[0]);
        }
        if (bug.hatchTemp && bug.hatchTemp.length === 2) {
          const bottomTemp = bug.hatchTemp[0] - 5; // Bottom range
          const topTemp = bug.hatchTemp[1] + 5; // Top range
          console.log(bottomTemp);
          if (bottomTemp <= temp.temp && temp.temp <= topTemp){
            bugsLikelyHatching.push(bug);
            console.log("hatching", bugsLikelyHatching);
          }
        }
      });

      return {
        ...matchingSite,
        temp: celcToFar(temp.temp),
        recentLogTime: temp.dateTime,
        bugsHatching: bugsLikelyHatching
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
      console.log(Sites);

    {showPopup &&
    updateSites 
      .filter(site => site !== null)
      .map((site) => (
        <React.Fragment key={site.id}>
          <Marker
            latitude={site.lat}
            longitude={site.long}
            anchor="bottom" // Anchor position
          >
          <LocationOnIcon style={{fontSize: viewState.zoom * 4, color: "red"}} // Customize icon color
        />
          </Marker>
          <Popup
            key={site.id} // Always add a unique key when rendering lists in React
            latitude={site.lat}
            longitude={site.long}
            anchor="top"
            onClose={() => setShowPopup(false)}
          >
            <div className="card flex-center">
              <div>
                <label style={{ fontSize: '1.2em' }}>{site.name}</label>
              </div>
              <div>Recent Log Time: {site.recentLogTime}</div>
              <div>Temperature: {site.temp}</div>
              <label style={{ marginTop: '20px', fontSize: '1.2em' }}>Bugs Likely To Hatch:</label>
              {site.bugsHatching.map((bug, index) => (
                <div key={index}>{bug}</div> // Use index as a key, or better yet, use a unique property if available
              ))};
            </div>
          </Popup>
        </React.Fragment>
      ))
    };
    </Map>
  );
}
export default App;
