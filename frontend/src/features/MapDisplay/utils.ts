import { LakeData } from '@type/LakeData';
import {
  MapElement,
  LakeGeoPoint,
  SewageGeoPoint,
  MapElementType,
} from './types/MapElements';
import { SewageCoordData } from '@/types/SewageData';

export function processLakeMapElements(
  lakeMapElements: LakeData[],
): MapElement[] {
  const elements: MapElement[] = lakeMapElements.map(
    (lakeMapElement: LakeData) => {
      const lakePoint: LakeGeoPoint = {
        id: lakeMapElement.id,
        name: lakeMapElement.lakeName,
        coordinates: [lakeMapElement.latitude, lakeMapElement.longitude],
        ...(lakeMapElement?.additionalNotes
          ? { additional_notes: lakeMapElement.additionalNotes }
          : {}),
      };
      return {
        id: lakeMapElement.id,
        dataType: 'lake',
        isSelectable: true,
        elementType: MapElementType.Marker,
        dataPoint: lakePoint,
      };
    },
  );
  return elements;
}

export function processSewageMapElements(
  sewageMapElements: SewageCoordData[],
): MapElement[] {
  const elements: MapElement[] = sewageMapElements.map(
    (sewageMapElement: SewageCoordData) => {
      const sewagePoint: SewageGeoPoint = {
        id: sewageMapElement.id,
        facility_owner: sewageMapElement.facilityOwner,
        coordinates: [sewageMapElement.latitude, sewageMapElement.longitude],
        radius: sewageMapElement.radius,
        colour: sewageMapElement.colour,
      };
      return {
        id: sewageMapElement.id,
        dataType: 'sewage',
        isSelectable: true,
        elementType: MapElementType.Circle,
        dataPoint: sewagePoint,
      };
    },
  );
  return elements;
}
