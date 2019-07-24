import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//create consistent theme styling for app
const theme = createMuiTheme({
  palette: {
      primary:  {
          main: '#0078d7',
      },
      secondary: {
          main: '#9c27b0',
      },
  },
  typography: {
      useNextVariants: true,
  },
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div></div>
    </MuiThemeProvider>
  );
}

export default App;
