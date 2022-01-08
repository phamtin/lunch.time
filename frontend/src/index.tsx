import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import ReactDOM from 'react-dom';

import App from './App';
import theme from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
