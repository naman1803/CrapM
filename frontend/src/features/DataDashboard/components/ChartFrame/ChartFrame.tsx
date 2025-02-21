import {
  Box,
  Grid2,
  SxProps,
} from '@mui/material';
import React from 'react';

// union for available dashboard sizings
type DashboardComponentSizing = 'row' | 'half' | 'quarter' | 'box';

export interface ChartFrameProps {
  size: DashboardComponentSizing;
  containerStyles?: SxProps;
  children: React.ReactNode;
}

/**
 * General Chart Component Frame
 */
const ChartFrame: React.FC<ChartFrameProps> = ({ size, containerStyles, children }) => {

  // dict for available grid sizings
  const gridSizings = {
    row: { xs: 12 },
    half: { xs: 12, md: 6 },
    quarter: { xs: 12, md: 6, lg: 3 },
    box: { xs: 12, sm: 6, md: 4, lg: 3 },
  };

  return (
    <Grid2 size={gridSizings[size]}>
      <Box
        sx={{
          border: 1,
          borderColor: '#3a3a3a',
          borderRadius: 1,
          ...containerStyles,
        }}
        padding={'0.5rem'}
      >
        <Grid2
          size={12}
          padding={'0.5rem'}
        >
        </Grid2>
        <Grid2 size={12} height={'100%'}>
          {children}
        </Grid2>
      </Box>
    </Grid2>
  );
};
export default ChartFrame;
