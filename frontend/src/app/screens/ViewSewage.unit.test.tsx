import React from 'react';
import { act, render } from '@testing-library/react';
import { ViewContextProps } from './View';
import Router from 'react-router-dom';
import { TestProviders } from '@/test-utils/MockProviders';
import { mockSewageElements } from '@/features/MapDisplay/test-utils/mocks';
import ViewSewage from './ViewSewage';
import { mockSewageSeverityElement } from '@/test-utils/apiDataMocks';
import * as SewageService from '@/services/sewageService';

jest.mock('recharts', () => ({
  __esModule: true,
  ...jest.requireActual('recharts'),
  ResponsiveContainer: jest.fn().mockImplementation(({ children }) => (
    <div>
      <p>ResponsiveContainer</p>
      {children}
    </div>
  )),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => mockContext,
}));

jest.mock('@/services/sewageService', () => {
  return {
    __esModule: true,
    fetchSewageSeverityData: jest
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ data: mockSewageSeverityElement, status: 200 }),
              100,
            ),
          ),
      ),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => { });

const mockContext: ViewContextProps = {
  lakes: [],
  handleSelect: jest.fn(),
  selectedElement: undefined,
  isLoading: false,
  sewage: mockSewageElements,
  handleHover: jest.fn(),
  hoveredElement: undefined,
};

const renderWithRouter = () => {
  return render(
    <TestProviders>
      <ViewSewage />
    </TestProviders>,
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewSewage', () => {
  it('renders "Sewage producer not found" if sewageId is invalid', () => {
    Router.useParams = jest.fn().mockReturnValue({ sewageId: 'invalid' });
    const { getByText } = renderWithRouter();
    expect(getByText('Sewage producer not found')).toBeInTheDocument();
    expect(SewageService.fetchSewageSeverityData).not.toHaveBeenCalled();
  });

  it('renders "Sewage producer not found" if sewage is not found', () => {
    Router.useParams = jest.fn().mockReturnValue({ sewageId: '4' });
    const { getByText } = renderWithRouter();
    expect(getByText('Sewage producer not found')).toBeInTheDocument();
    expect(SewageService.fetchSewageSeverityData).not.toHaveBeenCalled();
  });

  it('renders SewageInfoCard if sewage is selected', async () => {
    Router.useParams = jest.fn().mockReturnValue({ sewageId: '1' });
    mockContext.selectedElement = mockSewageElements[0];
    const { getAllByText, getByText } = renderWithRouter();

    expect(getByText('Eric')).toBeInTheDocument();
    expect(getAllByText('Loading Data...')).toHaveLength(2);

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(SewageService.fetchSewageSeverityData).toHaveBeenCalledTimes(1);
    expect(getAllByText('brainrot')).toHaveLength(2);
    expect(getAllByText('takingDumb')).toHaveLength(2);
  });
  it('calls handleSelect with no element when close button is clicked', () => {
    const { getByRole } = renderWithRouter();
    mockContext.selectedElement = mockSewageElements[0];
    act(() => {
      getByRole('button').click();
    });
    expect(mockContext.handleSelect).toHaveBeenCalledWith();
  });
});
