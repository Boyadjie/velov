import L from 'leaflet';

const iconPerson = new L.Icon({
  iconUrl: 'marker.svg',
  iconRetinaUrl: 'marker.svg',
  shadowUrl: 'marker-shadow.png',
  shadowAnchor: new L.Point(13, 20.5),
  iconSize: new L.Point(28, 45),
});

export { iconPerson };
