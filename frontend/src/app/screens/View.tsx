/* eslint-disable @typescript-eslint/no-unused-vars */
import { Map } from '@features/MapDisplay';
import { useEffect, useState } from 'react';
import { fetchMapData } from '@services/MapService';
import { fetchSewageCoordData } from '@services/sewageService';
import useAsyncResponse from '@hooks/useAsyncResponse';
import { LatLngExpression } from 'leaflet';
import { LakeData } from '@type/LakeData';
import { SewageCoordData } from '@/types/SewageData';
import { Box, Grid2 } from '@mui/material';
import {
  processLakeMapElements,
  processSewageMapElements,
} from '@/features/MapDisplay/utils';
import { MapElement } from '@/features/MapDisplay/types/MapElements';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export interface ViewContextProps {
  isLoading: boolean;
  lakes: MapElement[];
  sewage: MapElement[];
  handleSelect: (currentPointSelected?: MapElement) => void;
  selectedElement: MapElement | undefined;
  handleHover: (point: MapElement | null) => void;
  hoveredElement: MapElement | undefined;
}

function View() {
  const [sewagePoints, setSewagePoints] = useState<MapElement[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<MapElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<MapElement | null>(null);
  const [tempPoints, setTempPoints] = useState<MapElement[]>([]); // Array of [lat, lng] tuples
  const [center, setCenter] = useState<LatLngExpression>([43.53518, -80.21965]); // Default center
  const navigate = useNavigate();

  const { sewageId, lakeId } = useParams();
  const handleHoverPoint = (point: MapElement | null) => setHoveredPoint(point);

  useEffect(() => {
    if (sewageId && !isNaN(parseInt(sewageId))) {
      setSelectedPoint(
        sewagePoints.find((sewage) => sewage.id === parseInt(sewageId)) ?? null,
      );
    }
    if (lakeId && !isNaN(parseInt(lakeId))) {
      setSelectedPoint(
        tempPoints.find((lake) => lake.id === parseInt(lakeId)) ?? null,
      );
    }
  }, [sewageId, lakeId, sewagePoints, tempPoints]);

  const onLakeSuccess = (data: LakeData[]) => {
    //data is empty or smth
    if (!data || data?.length === 0) {
      return;
    }
    const temp = processLakeMapElements(data);
    setTempPoints(temp);

    setCenter([data[0].latitude, data[0].longitude]);
  };

  const onError = (error: any) => {
    console.error('Failed to fetch map data');
  };

  const onSewageSuccess = (data: SewageCoordData[]) => {
    if (!data || data?.length === 0) {
      return;
    }
    const procSewage = processSewageMapElements(data);
    setSewagePoints(procSewage);
  };

  const {
    callAsyncFunction: fetchData,
    isLoading,
    hasFetchedOnce,
  } = useAsyncResponse<LakeData[], []>({
    api: fetchMapData,
    onSuccess: onLakeSuccess,
    onError,
    initialLoadingState: false, // Set to true if you want the loading state initially active
  });

  const {
    callAsyncFunction: fetchSewage,
    isLoading: isStillLoading,
    hasFetchedOnce: hasFetched,
  } = useAsyncResponse<SewageCoordData[], []>({
    api: fetchSewageCoordData,
    onSuccess: onSewageSuccess,
    onError,
    initialLoadingState: false,
  });

  useEffect(() => {
    if (!hasFetchedOnce) {
      fetchData(); // Call the API
    }
  }, [fetchData, isLoading, hasFetchedOnce]);

  useEffect(() => {
    if (!hasFetched) {
      fetchSewage();
    }
  }, [fetchSewage, isStillLoading, hasFetched]);

  const handlePointSelect = (currentPointSelected?: MapElement) => {
    if (!currentPointSelected) {
      navigate('/view');
      return;
    }
    if (currentPointSelected.dataType === 'lake') {
      navigate(`/view/lake/${currentPointSelected.id}`);
    }
    if (currentPointSelected.dataType === 'sewage') {
      navigate(`/view/sewage/${currentPointSelected.id}`);
    }
  };

  return (
    <Box width='100%' sx={{ marginTop: '1rem' }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 'grow' }}>
            <Map
              points={[...tempPoints, ...sewagePoints]}
              selectedPoint={selectedPoint}
              onMapElementClick={handlePointSelect}
              center={center}
              title={'Lakes'}
              mapStyles={{
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                border: '1px solid white',
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                height: '300px',
              }}
              hoveredPoint={hoveredPoint}
            />
          </Grid2>
          <Outlet
            context={{
              isLoading: isStillLoading && isLoading,
              lakes: tempPoints,
              sewage: sewagePoints,
              handleSelect: handlePointSelect,
              selectedElement: selectedPoint,
              handleHover: handleHoverPoint,
              hoveredElement: hoveredPoint
            }}
          />
        </Grid2>
      )}
    </Box>
  );
}

export default View;
