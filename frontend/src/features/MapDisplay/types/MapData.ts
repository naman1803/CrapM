import { LatLngExpression } from 'leaflet';
import { MapElement } from './MapElements';

//used for maps
export interface MapData {
  points: MapElement[];
  selectedPoint: MapElement | null;
  center: LatLngExpression;
  title: string;
  mapStyles?: React.CSSProperties;
}
