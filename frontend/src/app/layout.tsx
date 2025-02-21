import { Box } from '@mui/material';
import AppRoutes from './routes';
import { Providers } from './providers';
import React from 'react';
import { Navbar, NavItemPage } from '@shared-components/NavBar';

const pages: NavItemPage[] = [
  { name: 'Home', route: '/' },
  { name: 'View', route: '/view' },
  { name: 'Sewage Data', route: '/datatable' },
];

const RootLayout: React.FC = () => {
  return (
    <Providers>
      <div className='fire-container'>
        <div className='fire'></div>
      </div>

      <Box
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100vh',
          padding: '1rem',
          paddingTop: '4rem',
          width: '100%',
        })}
      >
        <Navbar pages={pages} />
        <AppRoutes />
      </Box>
    </Providers>
  );
};

export default RootLayout;
