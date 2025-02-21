import '@/test-utils/reactLeafletMock';
import { fireEvent, render } from '@testing-library/react';
import MapElementLayer, { MapElementLayerProps } from './MapElementLayer';
import { MapElement, MapElementType } from '../../types/MapElements';
import { LatLngExpression } from 'leaflet';

const elementMarker: MapElement = {
  elementType: MapElementType.Marker,
  dataType: 'marker',
  id: 2,
  dataPoint: {
    coordinates: [0.0, 0.0] as LatLngExpression,
  },
  isSelectable: false,
};
const elementMarkerSelectable: MapElement = {
  elementType: MapElementType.Marker,
  dataType: 'marker',
  id: 2,
  dataPoint: {
    coordinates: [1.0, 1.0] as LatLngExpression,
  },
  isSelectable: true,
};

const elementCircle: MapElement = {
  elementType: MapElementType.Circle,
  dataType: 'circle',
  id: 3,
  dataPoint: {
    coordinates: [2.0, 2.0] as LatLngExpression,
    radius: 1,
    colour: 'Red',
  },
  isSelectable: false,
};
const elementCircleSelectable: MapElement = {
  elementType: MapElementType.Circle,
  dataType: 'circle',
  id: 4,
  dataPoint: {
    coordinates: [3.0, 3.0] as LatLngExpression,
    radius: 2,
    colour: 'Blue',
  },
  isSelectable: true,
};

const layerProps = { onElementClick: jest.fn() };

afterEach(() => {
  jest.clearAllMocks();
});
describe('MapElementLayer', () => {
  it('renders a MapElementMarker for each element', () => {
    const { getByText } = renderLayer({
      ...layerProps,
      elements: [elementMarker],
      hoveredPoint: null,
      selectedPoint: null,
      zoom: 13,
    });
    expect(getByText('Marker-0,0')).toBeInTheDocument();
  });
  it('renders a MapElementMarker with a click handler', () => {
    const { getByText } = renderLayer({
      ...layerProps,
      elements: [elementMarkerSelectable],
      hoveredPoint: null,
      selectedPoint: null,
      zoom: 13,
    });
    expect(getByText('Marker-1,1')).toBeInTheDocument();
    const button = getByText('button-click-1,1');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(layerProps.onElementClick).toHaveBeenCalled();
  });
  it('renders a MapElementCircle for each element', () => {
    const { getByText } = renderLayer({
      ...layerProps,
      elements: [elementCircle],
      hoveredPoint: null,
      selectedPoint: null,
      zoom: 13,
    });
    expect(getByText('Circle-2,2-radius-20')).toBeInTheDocument();
  });
  it('renders a MapElementCircle with a click handler', () => {
    const { getByText } = renderLayer({
      ...layerProps,
      elements: [elementCircleSelectable],
      hoveredPoint: null,
      selectedPoint: null,
      zoom: 13,
    });
    expect(getByText('Circle-3,3-radius-40')).toBeInTheDocument();

    const button = getByText('Circle-button-click-3,3');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(layerProps.onElementClick).toHaveBeenCalled();
  });
});

const renderLayer = (props: MapElementLayerProps) =>
  render(<MapElementLayer {...props} />);
