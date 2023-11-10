import {useCallback} from "react";

export const UserPositionButton = ({ map, setUserLocation }) => {

  const onClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setUserLocation([crd.latitude, crd.longitude]);
        map.flyTo([crd.latitude, crd.longitude], 18);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, [map])

  return (
      <button id="recenter" onClick={onClick}><img src="/user_location.svg" alt="Recenter sur l'utilisateur"/></button>
  )
}
