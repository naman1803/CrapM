import '../testUtils';
import { useMap } from 'react-leaflet';
import useMapFocus, { UseMapFocusProps } from './useMapFocus';
import {
  MapElement,
  MapElementType,
} from '@/features/MapDisplay/types/MapElements';
import { renderHook } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

describe('useMapFocus', () => {
  const mockMapElement: MapElement = {
    id: 1,
    dataPoint: {
      coordinates: [51.505, -0.09],
    },
    dataType: 'lake',
    isSelectable: true,
    elementType: MapElementType.Marker,
  };

  it('should focus on the selected point when autofocus is true', async () => {
    const mapMock = useMap();
    expect(mapMock.flyTo).not.toHaveBeenCalled();
    const { result } = renderUseMapFocusHook({
      selectedPoint: mockMapElement,
      zoom: 13,
      autofocus: true,
    });

    expect(result.current.focusOnSelected).toBeDefined();
  });
});

const renderUseMapFocusHook = (props: UseMapFocusProps) => {
  return renderHook(() => useMapFocus(props));
};
