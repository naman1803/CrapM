import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeOptions } from './theme';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wraps all providers for the app
 */
export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
        <CssBaseline />
        {children}
      </BrowserRouter>
    </ThemeProvider>
  );
};
