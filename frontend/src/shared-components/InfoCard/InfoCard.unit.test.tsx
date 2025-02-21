import { render } from '@testing-library/react';
import { TestProviders } from '@/test-utils/MockProviders';
import InfoCard, { InfoCardProps } from './InfoCard';
import { Typography } from '@mui/material';

const mockProps = {
  title: 'Test Title',
  infoItems: ['Test Item 1', 'Test Item 2'],
  children: <Typography>Hello World</Typography>,
  handleClose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('info card', () => {
  it('renders correctly', () => {
    const { asFragment } = renderInfoCard(mockProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders elements', () => {
    const { getByText, getByRole } = renderInfoCard(mockProps);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Item 1')).toBeInTheDocument();
    expect(getByText('Test Item 2')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('calls handleClose when close button is clicked', () => {
    const { getByRole } = renderInfoCard(mockProps);
    getByRole('button').click();
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
  it('does not render close button if handleClose is not provided', () => {
    const { queryByRole } = renderInfoCard({
      ...mockProps,
      handleClose: undefined,
    });
    expect(queryByRole('button')).not.toBeInTheDocument();
  });
});

const renderInfoCard = (props: InfoCardProps) => {
  return render(
    <TestProviders>
      <InfoCard {...props} />
    </TestProviders>,
  );
};
