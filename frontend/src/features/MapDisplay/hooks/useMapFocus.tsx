import { MapElement } from '@/features/MapDisplay/types/MapElements';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export interface UseMapFocusProps {
  /** The map element to focus the map on */
  selectedPoint: MapElement | null;
  /** The zoom level to use when focusing */
  zoom?: number;
  /** Should we automatically move the map when we change the selected point? */
  autofocus?: boolean;
}

export interface UseMapFocusTools {
  /** focuses the map on the currently selected point */
  focusOnSelected: () => void;
}
/**
 * Hook that automatically focuses the map on a given point. It will automatically move if the point updates
 * @param param0
 * @returns
 */
const useMapFocus = ({
  selectedPoint,
  zoom = 13,
  autofocus = true,
}: UseMapFocusProps) => {
  const map = useMap();

  const flyToSelected = (point: MapElement | null) => {
    if (point) {
      map.flyTo(point.dataPoint.coordinates, zoom, {
        animate: true,
      });
    }
  };

  useEffect(() => {
    if (autofocus) {
      flyToSelected(selectedPoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoint]);

  const focusOnSelected = () => {
    flyToSelected(selectedPoint);
  };
  return { focusOnSelected };
};
export default useMapFocus;
