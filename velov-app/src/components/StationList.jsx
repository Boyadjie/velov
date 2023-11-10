import {Marker, Popup} from "react-leaflet";
import {iconPerson} from "../icons/MarkerIcon";

export const StationList = ({stationList}) => {
  return <>
    {
      stationList.map((station) => (
        <Marker key={station.station_id} position={[station.lat, station.lon]} icon={iconPerson}>
          <Popup>
            <p>{station.name}</p>
            {station.address !== "" && <p>{station.address}</p>}
            <p>Capacité max : {station.capacity}</p>
            <p>Vélo disponnibles : {station.bikes_available}</p>
            <p>Docks vide : {station.docks_available}</p>
          </Popup>
        </Marker>
      ))
    }
  </>;
};
