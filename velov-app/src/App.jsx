import './styles/App.css';

import {MapContainer, Marker, TileLayer, Tooltip} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {useStationsInfos} from "./hook/useStationsInfos";
import {useEffect, useState} from "react";
import {UserPositionButton} from "./components/UserPositionButton";
import {StationList} from "./components/StationList";

function App() {
  const lyonLatLen = [45.764043, 4.835659];
  const { stationList } = useStationsInfos();

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredStationList, setFilteredStationList] = useState([...stationList]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [bikesAvailables, setBikesAvailables] = useState(1);
  const [docksAvailables, setDocksAvailables] = useState(0);

  const handleSearch = (value) => {
    setSearchQuery(value); // Update the searchQuery state
  }

  const handleFilterBikesAvailables = (value) => {
    setDocksAvailables(0);
    setBikesAvailables(value);
    const filteredStations = stationList.filter((station) =>
      station.bikes_available >= value
    );
    setFilteredStationList(filteredStations);
  }

  const handleFilterDocksAvailables = (value) => {
    setBikesAvailables(1);
    setDocksAvailables(value);
    const filteredStations = stationList.filter((station) =>
      station.docks_available >= value
    );
    setFilteredStationList(filteredStations);
  }

  useEffect(() => {
    const filteredStations = stationList.filter((station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStationList(filteredStations);
  }, [searchQuery, stationList]);

  return (
    <main>
      <h1>Velo'v</h1>
      <section>
        {map ? <UserPositionButton map={map} setUserLocation={setUserLocation} /> : null}
        <MapContainer id="map" center={lyonLatLen} zoom={14} scrollWheelZoom={true} ref={setMap}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" />
          {userLocation && (
            <Marker position={userLocation}>
              <Tooltip>Vous êtes ici</Tooltip>
            </Marker>
          )}
          <StationList stationList={filteredStationList} />
        </MapContainer>
      </section>
      <section id="filters">
        <input
          id="searchFiled"
          type="text"
          onChange={(e) => handleSearch(e.currentTarget.value)}
          placeholder="Rechercher un nom de station ..."
        />
        <div>
          <label>
            <p>Vélos&nbsp;disponibles</p>
            <input type="number" value={bikesAvailables} min="0" max="100" onChange={(e) => handleFilterBikesAvailables(e.currentTarget.value)}/>
          </label>
          <label>
            <p>Docks&nbsp;disponibles</p>
            <input type="number" value={docksAvailables} min="0" max="100" onChange={(e) => handleFilterDocksAvailables(e.currentTarget.value)}/>
          </label>
        </div>
      </section>
    </main>
  )
}

export default App
