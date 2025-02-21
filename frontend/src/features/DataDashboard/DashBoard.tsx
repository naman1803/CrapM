import { Box, Divider, Grid2, Typography } from '@mui/material';
import React from 'react';

export interface DashboardProps {
  title: string;
  dashBoardStyles?: React.CSSProperties;
  children: React.ReactNode;
}

const DashBoard: React.FC<DashboardProps> = ({ title, dashBoardStyles, children }) => {
  return (
    <Box
      maxHeight={'500px'}
      minHeight={'300px'}
      minWidth={'200px'}
      sx={{
        ...dashBoardStyles,
        overflow: 'auto',
      }}
      padding={'0.5rem'}
    >
      <Grid2 container spacing={2} paddingTop={'0.5rem'}>
        <Grid2 size={12}>
          <Box
            height={'auto'}
            paddingX={'0.5rem'}
            paddingBottom={'0.75rem'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography variant='h5'>{title}</Typography>
          </Box>
          <Divider />
        </Grid2>
        <Grid2 container width={'100%'} display={'flex'} justifyContent={'space-between'}>
          {children}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DashBoard;
