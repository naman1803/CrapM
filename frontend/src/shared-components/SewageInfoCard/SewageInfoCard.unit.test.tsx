import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/MockProviders';
import SewageInfoCard, { SewageInfoCardProps } from './SewageInfoCard';
import {
  SewageGeoPoint,
  MapElementType,
} from '@/features/MapDisplay/types/MapElements';
import { Typography } from '@mui/material';

const sewagePoint = {
  id: 6,
  facility_owner: 'Domtar Inc. - Espanola Mil',
  coordinates: [44.31, -79.21],
  radius: 20,
  colors: 'Red',
} as unknown as SewageGeoPoint;

const mockProps: SewageInfoCardProps = {
  sewage: {
    id: 1,
    dataType: 'sewage',
    isSelectable: true,
    elementType: MapElementType.Circle,
    dataPoint: sewagePoint,
  },
  children: <Typography>Hello World</Typography>,
  handleClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SewageInfoCard', () => {
  it('renders correctly', () => {
    const { asFragment } = renderSewageInfoCard(mockProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders elements', () => {
    const { getByText, getByRole } = renderSewageInfoCard(mockProps);
    expect(getByText('Domtar Inc. - Espanola Mil')).toBeInTheDocument();
    expect(getByText('Latitude: 44.31')).toBeInTheDocument();
    expect(getByText('Longitude: -79.21')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('calls handleClose when close button is clicked', () => {
    const { getByRole } = renderSewageInfoCard(mockProps);
    getByRole('button').click();
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
});

const renderSewageInfoCard = (props: SewageInfoCardProps) => {
  return render(
    <TestProviders>
      <SewageInfoCard {...props} />
    </TestProviders>,
  );
};
