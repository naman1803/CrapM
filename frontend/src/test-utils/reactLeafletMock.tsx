import { LeafletEventHandlerFnMap, LatLngExpression } from 'leaflet';

jest.mock('react-leaflet', () => ({
  __esModule: true,
  ...jest.requireActual('leaflet'),
  useMap: () => ({ flyTo: jest.fn() }),
  MapContainer: jest.fn().mockImplementation(({ children }) => (
    <div data-testid='leaflet-map-container'>
      <p>Map Container</p>
      {children}
    </div>
  )),
  Circle: jest
    .fn()
    .mockImplementation(
      ({
        center,
        radius,
        eventHandlers,
        children,
        key,
      }: {
        center: LatLngExpression;
        radius: number;
        eventHandlers: LeafletEventHandlerFnMap;
        children: React.ReactNode;
        key: any;
      }) => (
        <div key={key} data-testid={`Circle-${center.toString()}`}>
          <p>{`Circle-${center.toString()}-radius-${radius}`}</p>
          {Object.entries(eventHandlers).map(([keyE, value]) => (
            <button
              key={keyE}
              onClick={value}
              data-testid={`circle-${center.toString()}-button-${keyE}`}
            >
              {`Circle-button-${keyE}-${center.toString()}`}
            </button>
          ))}
          {children}
        </div>
      ),
    ),
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
        <div key={key} data-testid={`Marker-${position.toString()}`}>
          <p>{`Marker-${position.toString()}`}</p>
          {Object.entries(eventHandlers).map(([keyE, value]) => (
            <button
              key={keyE}
              onClick={value}
              data-testid={`marker-${position.toString()}-button-${keyE}`}
            >
              {`button-${keyE}-${position.toString()}`}
            </button>
          ))}
          {children}
        </div>
      ),
    ),
  Popup: jest.fn().mockImplementation(({ children }) => (
    <div data-testid='leaflet-popup'>
      <p>Popup</p>
      {children}
    </div>
  )),
  TileLayer: jest.fn().mockImplementation(({ children }) => (
    <div data-testid='leaflet-tilelayer'>
      <p>TileLayer</p>
      {children}
    </div>
  )),
}));
