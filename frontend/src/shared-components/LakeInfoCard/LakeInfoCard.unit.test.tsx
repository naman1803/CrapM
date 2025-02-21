import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/MockProviders';
import LakeInfoCard, { LakeInfoCardProps } from './LakeInfoCard';
import { LakeGeoPoint, MapElement, MapElementType } from '@/features/MapDisplay/types/MapElements';

const lakePoint = {
  id: 1,
  name: 'Mynor Lake',
  coordinates: [123, 456],
  additional_notes: 'Test Notes',
} as LakeGeoPoint;
const mockProps: LakeInfoCardProps = {
  lake: {
    id: 1,
    dataType: 'lake',
    isSelectable: true,
    elementType: MapElementType.Marker,
    dataPoint: lakePoint
  },
  handleClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LakeInfoCard', () => {
  it('renders correctly', () => {
    const { asFragment } = renderLakeInfoCard(mockProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders elements', () => {
    const { getByText, getByRole } = renderLakeInfoCard(mockProps);
    expect(getByText('Mynor Lake')).toBeInTheDocument();
    expect(getByText('Latitude: 123')).toBeInTheDocument();
    expect(getByText('Longitude: 456')).toBeInTheDocument();
    expect(getByText('Misc Information: Test Notes')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('calls handleClose when close button is clicked', () => {
    const { getByRole } = renderLakeInfoCard(mockProps);
    getByRole('button').click();
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
  it('does not show misc information if there are no additional notes', () => {
    const newLakePoint = { ...lakePoint, additional_notes: undefined };
    const { queryByText } = renderLakeInfoCard({
      ...mockProps,
      lake: { 
        ...mockProps.lake, 
        dataPoint: newLakePoint
      } as MapElement,
    });
    expect(queryByText('Misc Information')).not.toBeInTheDocument();
  });
});

const renderLakeInfoCard = (props: LakeInfoCardProps) => {
  return render(
    <TestProviders>
      <LakeInfoCard {...props} />
    </TestProviders>,
  );
};
