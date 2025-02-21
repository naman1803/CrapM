import { LatLngExpression } from 'leaflet';

export enum MapElementType {
  Marker = 'marker',
  Circle = 'circle',
}

// Represent a point on the map
interface MapElementBase {
  id: number;
  dataType: string;
  isSelectable: boolean;
}

interface MarkerElement extends MapElementBase {
  elementType: MapElementType.Marker;
  dataPoint: GeoPoint;
}

interface CircleElement extends MapElementBase {
  elementType: MapElementType.Circle;
  dataPoint: GeoCircle;
}

export interface GeoPoint {
  coordinates: LatLngExpression;
}

interface GeoCircle extends GeoPoint {
  radius: number;
  colour: string;
}

export interface LakeGeoPoint extends GeoPoint {
  id: number;
  name: string;
  additional_notes?: string;
}

export interface SewageGeoPoint extends GeoCircle {
  id: number;
  facility_owner: string;
}

export type MapElement = MarkerElement | CircleElement;
