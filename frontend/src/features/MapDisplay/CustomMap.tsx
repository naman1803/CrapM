import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapData } from '@/features/MapDisplay/types/MapData';
import { MapElement } from './types/MapElements';
import MapElementLayer from './components/MapElements/MapElementLayer';
import MapFocus from './components/MapFocus/MapFocus';

interface MapContainerProps {
  onMapElementClick: (element: MapElement) => void;
  mapStyles?: React.CSSProperties;
  hoveredPoint: MapElement | null;
  selectedPoint: MapElement | null;
}
export type MapProps = MapData & MapContainerProps;

const CustomMap: React.FC<MapProps> = ({
  points,
  center,
  mapStyles,
  selectedPoint,
  onMapElementClick,
  hoveredPoint
}) => {
  //useEffect on selectedPoint
  const [zoom, setZoom] = useState(13); // Initialize with default zoom

  // Track zoom level dynamically
  const ZoomListener = () => {
    const map = useMap();

    useEffect(() => {
      const handleZoom = () => setZoom(map.getZoom());
      map.on('zoomend', handleZoom);

      // Cleanup the listener on component unmount
      return () => {
        map.off('zoomend', handleZoom);
      };
    }, [map]);

    return null;
  }

  return (
    <Box display='flex' flexDirection='column' sx={mapStyles}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: '100%' }} // Added height for better display
      >
        <ZoomListener />
        <MapFocus selectedPoint={selectedPoint} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapElementLayer elements={points} onElementClick={onMapElementClick} hoveredPoint={hoveredPoint} selectedPoint={selectedPoint} zoom={zoom} />
      </MapContainer>
    </Box>
  );
};

export default CustomMap;
