import {
  LakeGeoPoint,
  MapElement,
  MapElementType,
  SewageGeoPoint,
} from '../types/MapElements';

export const mockLakeElements: MapElement[] = [
  {
    id: 1,
    dataType: 'lake',
    isSelectable: true,
    elementType: MapElementType.Marker,
    dataPoint: {
      coordinates: [0, 0],
      id: 1,
      name: 'Grrrr Lake',
      additional_notes: 'This is a lake',
    } as LakeGeoPoint,
  },
  {
    id: 2,
    dataType: 'lake',
    isSelectable: true,
    elementType: MapElementType.Marker,
    dataPoint: {
      coordinates: [0, 0],
      id: 2,
      name: 'Obama Lake',
    } as LakeGeoPoint,
  },
];

export const mockSewageElements: MapElement[] = [
  {
    id: 1,
    dataType: 'sewage',
    isSelectable: true,
    elementType: MapElementType.Circle,
    dataPoint: {
      coordinates: [0, 0],
      id: 1,
      facility_owner: 'Eric',
      radius: 100,
      colour: 'Blue',
    } as SewageGeoPoint,
  },
  {
    id: 2,
    dataType: 'sewage',
    isSelectable: true,
    elementType: MapElementType.Circle,
    dataPoint: {
      coordinates: [0, 0],
      id: 2,
      facility_owner: 'Myron',
      radius: 100,
      colour: 'Red',
    } as SewageGeoPoint,
  },
];
