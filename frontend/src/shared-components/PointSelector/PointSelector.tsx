import { Box, Button, ButtonGroup, Grid2 } from '@mui/material';
import React from 'react';
import { SewageGeoPoint, LakeGeoPoint, MapElement } from '@/features/MapDisplay/types/MapElements';

export interface PointSelectorProps {
  onListElementClick: (element: MapElement) => void;
  points: MapElement[];
  type: 'lake' | 'sewage';
  onHoverPoint: (element: MapElement | null) => void;
}

const PointSelector: React.FC<PointSelectorProps> = ({ points, onListElementClick, type, onHoverPoint }) => {
  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid white',
          borderRadius: '10px'
        }}
        minHeight={"300px"}
        maxHeight={"300px"}
      >
        <ButtonGroup
          color="primary"
          orientation="vertical"
          sx={{
            flexGrow: 1,
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
          }}
        >
          {points.map((point) => {
            const isLake = type === 'lake';
            const dataPoint = point.dataPoint as (typeof isLake extends true ? LakeGeoPoint : SewageGeoPoint);

            return (
              <Button
                key={point.id}
                onClick={() => onListElementClick(point)}
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  borderRadius: '0px',
                  color: 'white',
                  flexGrow: 1,
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 51%, white 49%)`,
                  backgroundPosition: 'top',
                  backgroundSize: '100% 200%',
                  transition: 'background-position 0.5s ease',
                  '&:hover': {
                    color: 'rgba(0, 0, 0, 0.75)',
                    backgroundPosition: 'bottom',
                  },
                }}
                onMouseEnter={() => onHoverPoint(point)}
                onMouseLeave={() => onHoverPoint(null)}
              >
                {isLake ? (point.dataPoint as LakeGeoPoint).name : (dataPoint as SewageGeoPoint).facility_owner}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Grid2>
  );
};

export default PointSelector;