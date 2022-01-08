import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.Mui-focused fieldset': {
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-input': {
            padding: '12px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#5569ff',
          fontWeight: '600',
          textTransform: 'none',
        },
        contained: {
          color: '#fff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'rgb(34, 51, 84)',
          margin: 'auto 8px',
          borderRadius: '5px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },
  palette: {
    text: {
      primary: '#243961',
      secondary: 'rgba(0, 0, 0, 0.5)',
      disabled: 'rgba(0, 0, 0, 0.4)',
    },
    primary: {
      main: '#5569ff',
      dark: '#474c6e',
      light: '#8291ff',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#5569ff',
      dark: 'rgb(17, 25, 32)',
      light: 'rgb(34, 51, 74)',
      contrastText: '#FFF',
    },
    success: {
      main: '#4CAF50',
      dark: '#3B873E',
      light: '#7BC67E',
      contrastText: '#FFF',
    },
    info: {
      main: '#2196F3',
    },
    // action: {
    //   hoverOpacity: 0.1,
    // },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
