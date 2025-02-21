import { createTheme, Theme } from '@mui/material';

export const themeOptions: Theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: '"Times New Roman", Times, serif',
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          color: 'white',
          backgroundImage: `linear-gradient(to bottom, #000000 50%, rgba(0, 0, 0, 0.30) 50%), url(../../../public/assets/link.gif)`,
          backgroundPosition: 'top',
          backgroundSize: '100% 200%',
          transition: 'background-position 0.5s ease',
          '&:hover': {
            mixBlendMode: 'difference',
            backgroundPosition: 'bottom',
            color: 'inherit',
          },
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(../../../public/assets/globe.gif), url(../../../public/assets/stars.gif)`,
          backgroundSize: '60% 100%, 100% 100%',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'center, center',
        },
      },
    },
  },
});
