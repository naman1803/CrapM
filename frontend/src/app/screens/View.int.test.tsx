import '@/test-utils/reactLeafletMock';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { TestProviders } from '@/test-utils/MockProviders';
import AppRoutes from '../routes';
import {
  mockLakeApiData,
  mockSewageApiData,
  mockSewageSeverityApiData,
} from '@/test-utils/apiDataMocks';
import LocationDisplay from '@/test-utils/LocationDisplay';
// jest.mock('@features/MapDisplay', () => ({
//   __esModule: true,
//   Map: () => <div>Mappa</div>,
// }));

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

afterEach(() => {
  jest.clearAllMocks();
});

describe('View', () => {
  it('renders the loading screen', () => {
    const { getByText } = renderViewPage('/view');
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the map with the list of lakes', async () => {
    const { getByText, getByTestId } = renderViewPage('/view');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    mockLakeApiData.forEach((lakeData) => {
      expect(getByText(lakeData.lakeName)).toBeInTheDocument();
    });
  });
  it('renders the map with the list of sewage facilities', async ()=>{
    const {getByText, getByTestId} = renderViewPage('/view');
    await waitFor(()=>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    mockSewageApiData.forEach((sewageMarkers)=>{
      expect(getByText(sewageMarkers.facilityOwner)).toBeInTheDocument();
    })
  })
});

describe('View/Lake', () => {
  it('renders the lake page', async () => {
    const selectedLake = mockLakeApiData[1];
    const { getByText, getByTestId } = renderViewPage('/view/lake/2');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    expect(getByText(selectedLake.lakeName)).toBeInTheDocument();
    expect(getByText(`Latitude: ${selectedLake.latitude}`)).toBeInTheDocument();
    expect(
      getByText(`Longitude: ${selectedLake.longitude}`),
    ).toBeInTheDocument();
  });
  it('selects a lake to display and displays the details', async () => {
    const { getByText, queryByText, getByTestId } = renderViewPage('/view');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    mockLakeApiData.forEach((element) => {
      expect(getByText(element.lakeName)).toBeInTheDocument();
    });
    const selectedLake = mockLakeApiData[1];
    fireEvent.click(getByText(selectedLake.lakeName));
    expect(getByText(selectedLake.lakeName)).toBeInTheDocument();
    expect(getByText(`Latitude: ${selectedLake.latitude}`)).toBeInTheDocument();
    expect(
      getByText(`Longitude: ${selectedLake.longitude}`),
    ).toBeInTheDocument();
    expect(queryByText('Obama')).not.toBeInTheDocument();
    expect(queryByText('Additional Notes:')).not.toBeInTheDocument();
  });
  it('selects a lake from the map and displays the details', async () => {
    const { getByText, queryByText, getByTestId } = renderViewPage('/view');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    mockLakeApiData.forEach((element) => {
      expect(getByText(element.lakeName)).toBeInTheDocument();
    });
    const selectedLake = mockLakeApiData[1];
    fireEvent.click(
      getByTestId(
        `marker-${selectedLake.latitude},${selectedLake.longitude}-button-click`,
      ),
    );
    expect(getByText(selectedLake.lakeName)).toBeInTheDocument();
    expect(getByText(`Latitude: ${selectedLake.latitude}`)).toBeInTheDocument();
    expect(
      getByText(`Longitude: ${selectedLake.longitude}`),
    ).toBeInTheDocument();
    expect(queryByText('Obama')).not.toBeInTheDocument();
    expect(queryByText('Additional Notes:')).not.toBeInTheDocument();
  });
  it('goes back to the view screen when the close button is clicked', async () => {
    const { getByText, getByTestId } = renderViewPage('/view/lake/2');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    fireEvent.click(getByTestId('infocard-exit'));
    expect(getByTestId('location-display')).toHaveTextContent('/view');
    expect(getByTestId('location-display')).not.toHaveTextContent(
      '/view/lake/2',
    );
    mockLakeApiData.forEach((element) => {
      expect(getByText(element.lakeName)).toBeInTheDocument();
    });
  });
});

describe('View/Sewage', () => {
  it('renders the sewage page', async () => {
    const { getByText, getAllByText, getByTestId } =
      renderViewPage('/view/sewage/2');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        getByTestId('infocard-body'),
      ).toBeInTheDocument(),
    );
    // expect(getByText('Loading Data...')).toBeInTheDocument();
    expect(getByText(mockSewageApiData[1].facilityOwner)).toBeInTheDocument();
    expect(getByText('Sewage Severity Data')).toBeInTheDocument();
    await waitFor(() =>
      expect(
        getAllByText(
          Object.entries(mockSewageSeverityApiData[1].contaminants)[0][0],
        ),
      ).toHaveLength(2),
    );
    expect(getAllByText('Severity Score:')).toHaveLength(2);
    Object.entries(mockSewageSeverityApiData[1].contaminants).forEach(
      ([contaminant, values]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { averageSeverityScore, averagePercentExceedance } = values;
        expect(getAllByText(contaminant)).toHaveLength(2);
        expect(getByText(`${averageSeverityScore}`)).toBeInTheDocument();
        expect(
          getByText(`Percent Exceedance: ${averagePercentExceedance}%`),
        ).toBeInTheDocument();
      },
    );
  });
  it('goes back to the view screen when the close button is clicked', async () => {
    const { getByText, getByTestId } = renderViewPage('/view/sewage/2');
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    fireEvent.click(getByTestId('infocard-exit'));
    expect(getByTestId('location-display')).toHaveTextContent('/view');
    expect(getByTestId('location-display')).not.toHaveTextContent(
      '/view/sewage/2',
    );
    mockLakeApiData.forEach((element) => {
      expect(getByText(element.lakeName)).toBeInTheDocument();
    });
    // verify location display is rendered
  });
  //we need the list to be rendered (future story)
  it('renders the sewage page from view', async () => {
    const { getByText, getAllByText, getByTestId } = renderViewPage('/view');
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() =>
      expect(getByTestId('leaflet-map-container')).toBeInTheDocument(),
    );
    const selectedSewageMarker = mockSewageApiData[1];
    await waitFor(() =>
      expect(
        getByTestId(
          `circle-${selectedSewageMarker.latitude},${selectedSewageMarker.longitude}-button-click`,
        ),
      ).toBeInTheDocument(),
    );
    fireEvent.click(
      getByTestId(
        `circle-${selectedSewageMarker.latitude},${selectedSewageMarker.longitude}-button-click`,
      ),
    );
    await waitFor(() =>
      expect(
        getByTestId('infocard-body'),
      ).toBeInTheDocument(),
    );
    expect(getByText(selectedSewageMarker.facilityOwner)).toBeInTheDocument();
    expect(getByText('Loading Data...')).toBeInTheDocument();

    await waitFor(() =>
      expect(
        getAllByText(
          Object.entries(mockSewageSeverityApiData[1].contaminants)[0][0],
        ),
      ).toHaveLength(2),
    );
    expect(getByTestId('location-display')).toHaveTextContent('/view/sewage/2');
  });
});

const renderViewPage = (initialRoute: string) =>
  render(
    <TestProviders initialRoute={initialRoute}>
      <AppRoutes />
      <LocationDisplay />
    </TestProviders>,
  );
