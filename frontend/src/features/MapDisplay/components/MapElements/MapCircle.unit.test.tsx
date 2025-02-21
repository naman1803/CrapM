import '@/test-utils/reactLeafletMock';
import { render, fireEvent } from '@testing-library/react';
import MapElementCircle from './MapCircle';
import { MapElementType, MapElement } from '../../types/MapElements';
import { LatLngExpression } from 'leaflet';

describe('MapElementCircle', () => {
  const mockElement: MapElement = {
    id: 1,
    dataType: 'circle',
    isSelectable: true,
    elementType: MapElementType.Circle,
    dataPoint: {
      coordinates: [51.505, -0.09] as LatLngExpression,
      radius: 20,
      colour: 'Red',
    },
  };

  /*
  const mockNonSelectableElement: MapElement = {
    ...mockElement,
    isSelectable: false
  };
  */

  const mockOnElementSelect = jest.fn();

  const mockHoveredPoint = null;
  const mockSelectedPoint = null;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the MapElementCircle correctly', () => {
    const { getByTestId } = render(
      <MapElementCircle
        element={mockElement}
        onElementSelect={mockOnElementSelect}
        hoveredPoint={mockHoveredPoint}
        selectedPoint={mockSelectedPoint}
      />,
    );
    expect(getByTestId('Circle-51.505,-0.09')).toBeInTheDocument();
  });

  test('calls onElementSelect when the circle is clicked and selectable', () => {
    const { getByTestId } = render(
      <MapElementCircle
        element={mockElement}
        onElementSelect={mockOnElementSelect}
        hoveredPoint={mockHoveredPoint}
        selectedPoint={mockSelectedPoint}
      />,
    );
    const button = getByTestId('circle-51.505,-0.09-button-click');
    fireEvent.click(button);
    expect(mockOnElementSelect).toHaveBeenCalledWith(mockElement);
  });

  /**
  test('check hover works on mouse over and mouse leave', () => {
    const { getByTestId } = render(
      <MapElementCircle element={mockNonSelectableElement} onElementSelect={mockOnElementSelect} />
    );
    const button = getByTestId('circle-51.505,-0.09-button-click');
    

  });
  **/
});
