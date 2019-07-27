import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './pages/login.page';
import Loading from './pages/loading.page';
import Home from './pages/home.page';

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

function RedirectToLogin() {
  return (
    <Redirect exact to="/login" />
  );
}

function App() {

  const [authorized, setAuthorized] = useState(true);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>

          { authorized ? (            
            <Route exact path="/" render={ props => (
              <Home />
            )} />
          ) : (<RedirectToLogin />)
          }

          <Route exact path="/login" render={ props => (
            <Login />
          )} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
