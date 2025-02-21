import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { themeOptions } from '@app/theme';
import React from 'react';

// Wraps all providers for the app for testing
export const TestProviders = ({
  children,
  initialRoute = '/',
}: {
  children?: React.ReactNode;
  initialRoute?: string;
}) => {
  return (
    <ThemeProvider theme={themeOptions}>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </ThemeProvider>
  );
};
