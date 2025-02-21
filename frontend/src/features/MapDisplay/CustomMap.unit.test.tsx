import './testUtils';

import { render } from '@testing-library/react';
import Map, { MapProps} from './CustomMap';
import '@/test-utils/reactLeafletMock';
import {
  LakeGeoPoint,
  MapElement,
  MapElementType,
  SewageGeoPoint,
} from './types/MapElements';
import { LatLngExpression } from 'leaflet';
import { processLakeMapElements, processSewageMapElements } from './utils';
import { SewageCoordData } from '@/types/SewageData';
import { LakeData } from '@/types/LakeData';


// jest.mock('react-leaflet', () => ({
//   __esModule: true,
//   ...jest.requireActual('leaflet'),
//   MapContainer: jest.fn().mockImplementation(({ children }) => (
//     <div>
//       <p>Map Container</p>
//       {children}
//     </div>
//   )),
//   Marker: jest.fn().mockImplementation(({ children, key }) => (
//     <div key={key}>
//       <p>Marker-{key}</p>
//       {children}
//     </div>
//   )),
//   Popup: jest.fn().mockImplementation(({ children }) => (
//     <div>
//       <p>Popup</p>
//       {children}
//     </div>
//   )),
//   TileLayer: jest.fn().mockImplementation(({ children }) => (
//     <div>
//       <p>TileLayer</p>
//       {children}
//     </div>
//   )),
// }));



const mockMapData: MapProps = {
  points: [
    {
      elementType: MapElementType.Marker,
      dataType: 'marker',
      id: 2,
      dataPoint: {
        coordinates: [0.0, 0.0] as LatLngExpression,
      },
      isSelectable: false,
    },
  ],
  selectedPoint: null,
  center: [43.53518, -80.21965],
  title: 'Test Map',
  onMapElementClick: jest.fn(),
  hoveredPoint: null,
};

describe('Map', () => {
  it('should render the map', () => {
    const { asFragment } = renderMap(mockMapData);
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('should not render any markers when given no points', () => {
    const { queryAllByText } = renderMap({ ...mockMapData, points: [] });
    expect(queryAllByText(/Marker-/)).toHaveLength(0);
  });

});
//should be removed in next feature
describe('map utils', () => {
  it('should process sewage map elements correctly', () => {
    const sewageMapElements: SewageCoordData[] = [
      {
        id: 1,
        facilityOwner: 'Owner A',
        latitude: 34.0522,
        longitude: -118.2437,
        radius: 20,
        colour: 'Red',
      },
      {
        id: 2,
        facilityOwner: 'Owner B',
        latitude: 40.7128,
        longitude: -74.006,
        radius: 20,
        colour: 'Red',
      },
    ];

    const expectedOutput: MapElement[] = [
      {
        id: 1,
        dataType: 'sewage',
        isSelectable: true,
        elementType: MapElementType.Circle,
        dataPoint: {
          id: 1,
          facility_owner: 'Owner A',
          coordinates: [34.0522, -118.2437],
          radius: 20,
          colour: 'Red',
        } as SewageGeoPoint,
      },
      {
        id: 2,
        dataType: 'sewage',
        isSelectable: true,
        elementType: MapElementType.Circle,
        dataPoint: {
          id: 2,
          facility_owner: 'Owner B',
          coordinates: [40.7128, -74.006],
          radius: 20,
          colour: 'Red',
        } as SewageGeoPoint,
      },
    ];

    const result = processSewageMapElements(sewageMapElements);
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array when input is empty', () => {
    const sewageMapElements: SewageCoordData[] = [];
    const expectedOutput: MapElement[] = [];
    const result = processSewageMapElements(sewageMapElements);
    expect(result).toEqual(expectedOutput);
  });
});

describe('processLakeMapElements', () => {
  it('should process lake map elements correctly', () => {
    const lakeMapElements: LakeData[] = [
      {
        id: 1,
        lakeName: 'Lake A',
        latitude: 34.05,
        longitude: -118.25,
        additionalNotes: 'Beautiful lake',
      },
      {
        id: 2,
        lakeName: 'Lake B',
        latitude: 36.16,
        longitude: -115.15,
      },
    ];

    const expectedOutput: MapElement[] = [
      {
        id: 1,
        dataType: 'lake',
        isSelectable: true,
        elementType: MapElementType.Marker,
        dataPoint: {
          id: 1,
          name: 'Lake A',
          coordinates: [34.05, -118.25],
          additional_notes: 'Beautiful lake',
        } as LakeGeoPoint,
      },
      {
        id: 2,
        dataType: 'lake',
        isSelectable: true,
        elementType: MapElementType.Marker,
        dataPoint: {
          id: 2,
          name: 'Lake B',
          coordinates: [36.16, -115.15],
        } as LakeGeoPoint,
      },
    ];

    const result = processLakeMapElements(lakeMapElements);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty lake map elements array', () => {
    const lakeMapElements: LakeData[] = [];
    const expectedOutput: MapElement[] = [];
    const result = processLakeMapElements(lakeMapElements);
    expect(result).toEqual(expectedOutput);
  });
});

const renderMap = (props: MapProps) => render(<Map {...props} />);
