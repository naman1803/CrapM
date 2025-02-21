import { act, render, waitFor } from '@testing-library/react';
import View from './View';
import { fetchMapData } from '../../services/MapService';
import { LakeData } from '@/types/LakeData';
import { TestProviders } from '@/test-utils/MockProviders';
jest.mock('@features/MapDisplay', () => ({
  __esModule: true,
  Map: () => <div>Mappa</div>,
}));

jest.mock('@services/MapService', () => {
  return {
    __esModule: true,
    fetchMapData: jest
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ data: mockMapData, status: 200 }), 100),
          ),
      ),
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});
// id: number;
// name: string;
// latitude: number;
// longitude: number;
// additional_notes?: string;
const mockMapData: LakeData[] = [
  { id: 1, lakeName: 'Lake', latitude: 0, longitude: 0 },
];

// beforeEach(() => {
//   fetchMapData(
//     () => new Promise((resolve) => setTimeout(() => resolve(mockMapData), 100)),
//   );
// });
beforeAll(() => {
  jest.useFakeTimers();
});
describe('View', () => {
  it('renders the loading screen', () => {
    const { getByText } = renderViewPage({});
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the map', async () => {
    const { getByText } = renderViewPage({});
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(fetchMapData).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(getByText('Mappa')).toBeInTheDocument());
  });
});

const renderViewPage = (props = {}) =>
  render(
    <TestProviders>
      <View {...props} />
    </TestProviders>,
  );
