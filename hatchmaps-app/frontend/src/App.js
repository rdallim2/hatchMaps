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
  const [bugsLikelyHatching, setBugsLikelyHatching] = useState([]);

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


  useEffect(() => {
    const newBugsLikelyHatching = [];

    const updatedSites = temps.map(temp => {
      const matchingSite = sites[temp.idNum];
      console.log("Looking for id num", temp.idNum);

      if (matchingSite) {
        console.log("Found match.");
        console.log(matchingSite.lat);

        const dateString = temp.dateTime; // e.g., '07/10/97'
        const monthNumber = dateString.substring(0, 2); // Convert to integer
        const monthName = monthNames[monthNumber - 1]; // Adjust for zero-based index

        console.log(monthName); // Output: 'jul'
        
        console.log(matchingSite.bodyOfWater);
        console.log(matchingSite.bodyOfWater.bugs);

        Object.entries(matchingSite.bodyOfWater.bugs).forEach(([bugName, bugEntry]) => {
          const bug = bugEntry.bug; // Access the Bug instance

          if (bug.hatchTemp && bug.hatchTemp.length === 2) {
            const bottomTemp = bug.hatchTemp[0] - 2; // Bottom range
            const topTemp = bug.hatchTemp[1]; // Top range

            console.log(bottomTemp);
            console.log(topTemp);
            console.log(temp.temp);
            
            let farTemp = temp.temp;
            farTemp = celcToFar(farTemp); // Convert temperature to Fahrenheit

            console.log(farTemp);
            if (bottomTemp <= farTemp && farTemp <= topTemp) {
              newBugsLikelyHatching.push(bug);
              console.log("Hatching", bug);
            }
          }
        });
        console.log("matching site: ");
        console.log(matchingSite);
        console.log(newBugsLikelyHatching);

        return {
          ...matchingSite,
          temp: celcToFar(temp.temp),
          recentLogTime: temp.dateTime,
          bugsHatching: newBugsLikelyHatching, // Store hatching bugs for this site
        };

        newBugsLikelyHatching.length = 0;
      }

      return null;
    });

    setBugsLikelyHatching(newBugsLikelyHatching);

  }, [temps]); // Run effect when temps change

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
    temps
      .map(temp => {
        const matchingSite = sites[temp.idNum]; // Assuming `sites` is defined
        if (matchingSite) {
          return {
            ...matchingSite,
            temp: celcToFar(temp.temp), // Ensure temp is converted
            recentLogTime: temp.dateTime,
            bugsHatching: bugsLikelyHatching, // Use the state that contains the bugs
          };
        }
        return null;
      })
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
                <div key={`${bug.id || bug.name}-${index}`}>{bug.name}</div> // Use bug.id or a combination to create a unique key
              ))}
            </div>
          </Popup>
        </React.Fragment>
      ))
    };
    </Map>
  );
}
export default App;
