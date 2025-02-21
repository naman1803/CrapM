import { Circle } from 'react-leaflet';
import { MapElement, SewageGeoPoint } from '../../types/MapElements';
import React, { useState, useEffect, useRef } from 'react';
import { LatLngTuple } from 'leaflet';

interface MapElementCircleProps {
  element: MapElement;
  onElementSelect: (elementSelected: MapElement) => void;
  hoveredPoint: MapElement | null;
  selectedPoint: MapElement | null;
}
const MapElementCircle: React.FC<MapElementCircleProps> = ({
  element,
  onElementSelect,
  hoveredPoint,
  selectedPoint,
}) => {
  const datapoint = element.dataPoint as SewageGeoPoint;
  const [color, setColor] = useState('gray'); // Default color
  const baseColor = useRef('gray');

  // Change color based on hover
  useEffect(() => {
    if (
      selectedPoint &&
      selectedPoint.dataPoint.coordinates === datapoint.coordinates
    ) {
      setColor('red'); // Selected color
      baseColor.current = 'red';
    } else if (
      hoveredPoint &&
      hoveredPoint.dataPoint.coordinates === datapoint.coordinates
    ) {
      setColor('blue'); // Hover color
      baseColor.current = 'blue';
    } else {
      setColor(datapoint.colour); // Default color
      baseColor.current = datapoint.colour;
    }
  }, [selectedPoint, hoveredPoint, datapoint.coordinates, datapoint.colour]);

  return (
    <Circle
      radius={isNaN(datapoint?.radius) ? 20 : datapoint.radius * 20}
      color={datapoint.colour}
      center={datapoint.coordinates}
      data-testid={`Circle-${datapoint.coordinates as LatLngTuple}`}
      pathOptions={{ color }}
      eventHandlers={{
        ...(element.isSelectable
          ? {
              click: () => onElementSelect(element),
              mouseover: () => setColor('blue'), // Hover color
              mouseout: () => setColor(baseColor.current), // Revert to base color
            }
          : {}),
      }}
    ></Circle>
  );
};

export default MapElementCircle;
