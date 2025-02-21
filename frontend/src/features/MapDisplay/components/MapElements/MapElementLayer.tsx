import { MapElementType, MapElement } from '../../types/MapElements';
import MapElementMarker from './MapMarker';
import MapElementCircle from './MapCircle';

export interface MapElementLayerProps {
  elements: MapElement[];
  onElementClick: (element: MapElement) => void;
  hoveredPoint: MapElement | null;
  selectedPoint: MapElement | null;
  zoom: number;
}

const MapElementLayer: React.FC<MapElementLayerProps> = ({
  elements,
  onElementClick,
  hoveredPoint,
  selectedPoint,
  zoom,
}) => {
  return (
    <>
      {elements.map((element) => {
        switch (element.elementType) {
          case MapElementType.Marker:
            return (
              <MapElementMarker
                key={`${element.id}-${element.elementType}`}
                element={element}
                onElementSelect={onElementClick}
                hoveredPoint={hoveredPoint}
                selectedPoint={selectedPoint}
                zoom={zoom}
              />
            );
          case MapElementType.Circle:
            return (
              <MapElementCircle
                key={`${element.id}-${element.elementType}`}
                element={element}
                onElementSelect={onElementClick}
                hoveredPoint={hoveredPoint}
                selectedPoint={selectedPoint}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};
export default MapElementLayer;
