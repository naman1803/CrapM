import { Marker } from 'react-leaflet';
import { MapElement } from '../../types/MapElements';
import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';

interface MapElementMarkerProps {
  element: MapElement;
  onElementSelect?: (elementSelected: MapElement) => void;
  hoveredPoint: MapElement | null;
  selectedPoint: MapElement | null;
  zoom: number;
}

const MapElementMarker: React.FC<MapElementMarkerProps> = ({
  element,
  onElementSelect,
  hoveredPoint,
  selectedPoint,
  zoom
}) => {
  const [color, setColor] = useState('gray');  // Default color
  const baseColor = useRef('gray');

  // Change color based on hover
  useEffect(() => {
    if (selectedPoint && selectedPoint.dataPoint.coordinates === element.dataPoint.coordinates) {
      setColor('red');  // Selected color
      baseColor.current = 'red';
    } else if (hoveredPoint && hoveredPoint.dataPoint.coordinates === element.dataPoint.coordinates) {
      setColor('blue');  // Hover color
      baseColor.current = 'blue';
    } else {
      setColor('gray');  // Default color
      baseColor.current = 'gray';
    }
  }, [selectedPoint, hoveredPoint, element.dataPoint.coordinates]);
  
  const MIN_SIZE = 7; 

  const markerSize = Math.max(MIN_SIZE, zoom*1.5);
  // Custom HTML-based icon with dynamic color
  const markerHtmlStyles = `
    background-color: ${color};
    width: ${markerSize}px;
    height: ${markerSize}px;
    display: block;
    left: -${markerSize / 2}px;  /* Center horizontally */
    top: -${markerSize / 2}px;   /* Center vertically */
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF;
  `;

  const icon = L.divIcon({
    className: 'lake-marker',
    iconAnchor: [0, 10],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`,
  });

  return (
    <Marker
      position={element.dataPoint.coordinates}
      icon={icon}
      eventHandlers={{
        ...(element.isSelectable
          ? {
              click: () => onElementSelect && onElementSelect(element),
              mouseover: () => setColor('blue'), // Hover color
              mouseout: () => setColor(baseColor.current) // Revert to base color
            }
          : {})
      }}
    />

  );
};

export default MapElementMarker;