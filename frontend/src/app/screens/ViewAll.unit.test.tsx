import React from 'react';
import { render } from '@testing-library/react';
import { ViewContextProps } from './View';
import { TestProviders } from '@/test-utils/MockProviders';
import { mockLakeElements } from '@/features/MapDisplay/test-utils/mocks';
import ViewAll from './ViewAll';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ lakeId: '1' })),
  useOutletContext: () => mockContext,
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
      <ViewAll />
    </TestProviders>,
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewAll', () => {
  it('renders list of lakes', () => {
    const { getByText } = renderWithRouter();
    expect(getByText('Grrrr Lake')).toBeInTheDocument();
    expect(getByText('Obama Lake')).toBeInTheDocument();
  });
  it('calls handleSelect when lake is clicked', () => {
    const { getByText } = renderWithRouter();
    getByText('Grrrr Lake').click();
    expect(mockContext.handleSelect).toHaveBeenCalledWith(mockLakeElements[0]);
  });
});
