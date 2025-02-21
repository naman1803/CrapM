import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/MockProviders';
import PointSelector, { PointSelectorProps } from './PointSelector';
import { LatLngExpression } from 'leaflet';
import { LakeGeoPoint, MapElementType } from '@/features/MapDisplay/types/MapElements';

const mockProps: PointSelectorProps = {
  type: 'lake',
  points: [
    {
      elementType: MapElementType.Marker,
      dataType: 'marker',
      id: 1,
      dataPoint: {
        id: 1,
        name: "Mynor Lake",
        coordinates: [0.0, 0.0] as LatLngExpression,
        additional_notes: undefined
      } as LakeGeoPoint,
      isSelectable: true,
    },{
      elementType: MapElementType.Marker,
      dataType: 'marker',
      id: 2,
      dataPoint: {
        id: 2,
        name: "Red Lake",
        coordinates: [3.0, 3.0] as LatLngExpression,
        additional_notes: undefined
      } as LakeGeoPoint,
      isSelectable: true,
    }
  ],
  onListElementClick: jest.fn(),
  onHoverPoint: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PointSelector', () => {
  it('renders correctly', () => {
    const { asFragment } = renderPointSelector(mockProps);
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('renders elements', () => {
    const { getByRole } = renderPointSelector(mockProps);
    expect(getByRole('button', { name: 'Mynor Lake' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Red Lake' })).toBeInTheDocument();
  });
  
  it('calls onListElementClick when list button is clicked', () => {
    const { getAllByRole } = renderPointSelector(mockProps);
    getAllByRole('button')[0].click();
    expect(mockProps.onListElementClick).toHaveBeenCalled();
    getAllByRole('button')[1].click();
    expect(mockProps.onListElementClick).toHaveBeenCalled();
  });
});

const renderPointSelector = (props: PointSelectorProps) => {
  return render(
    <TestProviders>
      <PointSelector {...props} />
    </TestProviders>,
  );
};