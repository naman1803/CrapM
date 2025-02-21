import React from 'react';
import { useMapFocus } from '../../hooks';
import { MapElement } from '../../types/MapElements';

interface MapFocusProps {
  /** The selected point   */
  selectedPoint: MapElement | null;
}
/**
 * A component that makes use of the useMapFocus hook to focus the map on a given point
 * Should be built upon in the future
 * @param param0
 */
const MapFocus: React.FC<MapFocusProps> = ({ selectedPoint }) => {
  useMapFocus({
    selectedPoint,
  });
  return null;
};

export default MapFocus;
