import * as React from 'react';
import { useState, useEffect } from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { sites } from './data/Data';
import celcToFar from './functions/functions.js';
import "./custom.css";
import { Link } from 'react-router-dom'

const sitePopup = ({ site, onClose }) => (
<Popup
  //</React.Fragment>key={site.id} // Always add a unique key when rendering lists in React
  latitude={site.lat}
  longitude={site.long}
  anchor="top"
  onClose={onClose}
  closeOnClick={false}
>
  <div className="card flex-center">
    <div>
      <label style={{ fontSize: '1.2em' }}>{site.name}</label>
    </div>
    <div>Recent Log Time: {site.recentLogTime}</div>
    <div>Temperature: {site.temp}</div>
    <label style={{ marginTop: '20px', fontSize: '1.2em' }}>Bugs Likely To Hatch:</label>
    <div>{site.bugsHatching.length > 0 ? (
      site.bugsHatching.map((bug) => (
        <div key={bug.id}>{bug.name}</div> // Using bug.id as a unique key
        ))
      ) : (
        <div>No bugs likely to hatch</div> // Fallback message if there are no bugs
      )}
    </div>
  </div>
</Popup>
);

function App() {
  const [temps, settemps] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 44.6262275,
    longitude: -121.4839433,
    zoom: 6,
  });
  //const [showPopup, setShowPopup] = useState(true);
  const [updatedSites, setUpdatedSites] = useState([]); 
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    axios.get('https://hatchmaps.com/temps')
    .then(response => {
      settemps(response.data);
      console.log("Temps properly fetched from backend:", response.data);
    })
    .catch(error => {
      console.error('error fetching temps:', error);
    });
  }, []);


  useEffect(() => {

    const newUpdatedSites = temps.map(temp => {
      const matchingSite = sites[temp.idNum];

      if (matchingSite) {
        const newBugsLikelyHatching = [];

        //const dateString = temp.dateTime; // e.g., '07/10/97'
        //const monthNumber = dateString.substring(0, 2); // Convert to integer
        //const monthName = monthNames[monthNumber - 1]; // Adjust for zero-based index

        Object.entries(matchingSite.bodyOfWater.bugs).forEach(([bugName, bugEntry]) => {
          const bug = bugEntry.bug; // Access the Bug instance

          if (bug.hatchTemp && bug.hatchTemp.length === 2) {
            const bottomTemp = bug.hatchTemp[0] - 2; // Bottom range
            const topTemp = bug.hatchTemp[1]; // Top range
            let farTemp = temp.temp;
            farTemp = celcToFar(farTemp); // Convert temperature to Fahrenheit

            console.log(farTemp);
            if (bottomTemp <= farTemp && farTemp <= topTemp) {
              newBugsLikelyHatching.push(bug);
            }
          }
        });
        console.log("temp.dateTime:", temp.dateTime);

        return {
          ...matchingSite,
          temp: celcToFar(temp.temp),
          recentLogTime: temp.dateTime,
          bugsHatching: newBugsLikelyHatching, // Store hatching bugs for this site
        };
      }
      return null;
    }).filter(site => site !== null); // Filter out null values

    console.log("Current Updated Sites: ", updatedSites);

    if (JSON.stringify(newUpdatedSites) !== JSON.stringify(updatedSites)) {
      setUpdatedSites(newUpdatedSites);
      console.log(newUpdatedSites);
    }
  }, [temps]); // Run effect when temps change

  return (
  <div className="app-container">
    <div className="container-fluid text-center text-white" style={{ backgroundColor: '#80a981', padding: '5px 0'}}>
      {/* Title Section */}
      <h1 className="text-center">Hatchmaps</h1>
      {/* Links Section */}
      <div className="row justify-content-center">
        <div className="col">
          <a href="https://github.com/rdallim2/hatchMaps" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-light" >
              Github
            </button>
          </a>
        </div>
        <div className="col">
          <a href="https://rdallim2.github.io/RyanDallimore_site/" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-light">
              Contact
            </button>
          </a>
        </div>
      </div>
    </div>
    <Map //All this taken from documentation
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      {...viewState}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/rdallim2/cm1ibsts6000h01rb81k7efth"
      onMove={(evt) => setViewState(evt.viewState)} // Update view state including zoom
    >
    {updatedSites.map((site) => (
        <React.Fragment key={site.id}>
          <Marker
            latitude={site.lat}
            longitude={site.long}
            anchor="bottom" // Anchor position
            key={site.id}
            onClick={() => {
              console.log("Marker clicked:", site.id);
              setSelectedSite(site);
            }}
          >
          <LocationOnIcon 
            style={{
              fontSize: viewState.zoom * 4, 
              color: "red", 
              backgroundColor: "transparent" // Remove any background color
            }} 
          />
          </Marker>
          {selectedSite && selectedSite.id === site.id && (
              <sitePopup site={site} onClose={() => setSelectedSite(null)} />
          )}
        </React.Fragment>
      ))
    };
    </Map>
  </div>
  );
}
export default App;
