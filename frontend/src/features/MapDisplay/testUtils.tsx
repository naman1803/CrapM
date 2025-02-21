import { LeafletEventHandlerFnMap, LatLngExpression } from 'leaflet';

jest.mock('react-leaflet', () => ({
  __esModule: true,
  ...jest.requireActual('leaflet'),
  useMap: () => ({
    flyTo: jest.fn(),
    getZoom: jest.fn().mockReturnValue(13), // Add getZoom method returning default zoom level
    on: jest.fn(), // Mock on method for event handling
    off: jest.fn(), // Mock off method for removing event listeners
  }),
  MapContainer: jest.fn().mockImplementation(({ children }) => (
    <div>
      <p>Map Container</p>
      {children}
    </div>
  )),
  Marker: jest
    .fn()
    .mockImplementation(
      ({
        position,
        children,
        key,
        eventHandlers,
      }: {
        eventHandlers: LeafletEventHandlerFnMap;
        position: LatLngExpression;
        key: any;
        children: React.ReactNode;
      }) => (
        <div key={key}>
          <p>{`Marker-${position.toString()}`}</p>
          {Object.entries(eventHandlers).map(([keyE, value]) => (
            <button key={keyE} onClick={value}>
              {`button-${keyE}-${position.toString()}`}
            </button>
          ))}
          {children}
        </div>
      ),
    ),
  Popup: jest.fn().mockImplementation(({ children }) => (
    <div>
      <p>Popup</p>
      {children}
    </div>
  )),
  TileLayer: jest.fn().mockImplementation(({ children }) => (
    <div>
      <p>TileLayer</p>
      {children}
    </div>
  )),
}));
