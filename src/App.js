import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './pages/login.page';
import Loading from './pages/loading.page';

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
      <Router>
        <div>
          <Route exact path="/" render={ props => (
            <Loading />
          )} />
          <Route exact path="/login" render={ props => (
            <Login />
          )} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
