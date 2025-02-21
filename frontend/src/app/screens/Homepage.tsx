import React from 'react';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box
      component='header'
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          width: { xs: '80%', sm: '60%', md: '50%' },
          maxWidth: '500px',
          height: 'auto',
        }}
      >
        <img src={'../../../public/assets/home_logo.gif'} alt="crapmap in flames" style={{ width: '100%', height: 'auto' }} />
      </Box>

      <Typography
        sx={{
          textDecoration: 'underline',
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid white',
          borderRadius: '8px',
        }}
        variant='h5'
      >
        Introducing CrapMap: A Simple, Effective Tool for Visualizing Water
        Pollution!
      </Typography>

      <Typography
        sx={{
          width: { xs: '90%', md: '50%' },
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid white',
          borderRadius: '8px',
        }}
        variant='h6'
      >
        Clean drinking water is a fundamental necessity, yet industrial
        wastewater and sewage emissions pose significant risks to water sources.
        CrapMap provides a clear, interactive solution to monitor and visualize
        these impacts. This map-based application offers users a comprehensive
        view of how pollution affects water quality, allowing them to pinpoint
        areas where drinking water is most at risk.
      </Typography>

      <Typography
        sx={{
          width: { xs: '90%', md: '50%' },
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid white',
          borderRadius: '8px',
        }}
        variant='h6'
      >
        Through CrapMap, users can view interactive maps displaying pollution
        sources, overlay pollution data over time, filter results based on
        pollutants, and track pollution severity in specific regions. By
        offering a user-friendly way to visualize and analyze water quality
        data, CrapMap empowers communities and environmental professionals to
        make informed decisions about water safety.
      </Typography>
    </Box>
  );
};

export default App;
