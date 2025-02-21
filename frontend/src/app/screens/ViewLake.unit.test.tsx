import React, { act } from 'react';
import { render } from '@testing-library/react';
import { ViewContextProps } from './View';
import ViewLake from './ViewLake';
import Router from 'react-router-dom';
import { TestProviders } from '@/test-utils/MockProviders';
import { mockLakeElements } from '@/features/MapDisplay/test-utils/mocks';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ lakeId: '1' })),
  useOutletContext: () => mockContext,
  useNavigate: () => jest.fn(),
}));

const mockContext: ViewContextProps = {
  lakes: mockLakeElements,
  handleSelect: jest.fn(),
  selectedElement: undefined,
  isLoading: false,
  sewage: [],
  handleHover: jest.fn(),
  hoveredElement: undefined,
};

const renderWithRouter = () => {
  return render(
    <TestProviders>
      <ViewLake />
    </TestProviders>,
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewLake', () => {
  it('renders "No lake found" if lakeId is invalid', () => {
    Router.useParams = jest.fn().mockReturnValue({ lakeId: 'invalid' });
    const { getByText } = renderWithRouter();
    expect(getByText('No lake found')).toBeInTheDocument();
  });

  it('renders "No lake found" if lake is not found', () => {
    Router.useParams = jest.fn().mockReturnValue({ lakeId: '4' });
    const { getByText } = renderWithRouter();
    expect(getByText('No lake found')).toBeInTheDocument();
  });

  it('renders "Loading..." if context is still loading', () => {
    mockContext.isLoading = true;
    Router.useParams = jest.fn().mockReturnValue({ lakeId: '1' });

    const { getByText } = renderWithRouter();
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders LakeInfoCard if lake is selected', () => {
    Router.useParams = jest.fn().mockReturnValue({ lakeId: '1' });
    mockContext.selectedElement = mockLakeElements[0];
    mockContext.isLoading = false;
    const { getByText } = renderWithRouter();

    expect(getByText('Grrrr Lake')).toBeInTheDocument();
  });
  it('calls handleSelect when lake is clicked', () => {
    const { getByRole } = renderWithRouter();
    mockContext.selectedElement = mockLakeElements[0];
    mockContext.isLoading = false;
    act(() => {
      getByRole('button').click();
    });
    expect(mockContext.handleSelect).toHaveBeenCalledWith();
  });
});
