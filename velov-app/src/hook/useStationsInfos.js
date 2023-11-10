import {useEffect, useMemo, useState} from "react";

export const useStationsInfos = () => {
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/`, requestOptions)
      .then((resp) => resp.json())
      .then((res) => setStationList(res))
      .catch(err => console.error(err));
  }, []);

  return {stationList, setStationList}
}
