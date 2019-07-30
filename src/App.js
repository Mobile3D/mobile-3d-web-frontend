import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './pages/login.page';
import Loading from './pages/loading.page';
import Home from './pages/home.page';
import Settings from './pages/settings.page';
import AccountSettings from './pages/accountsettings.page';
import ConnectionSettings from './pages/connectionsettings.page';
import AddAccount from './pages/addaccount.page';
import Files from './pages/files.page';
import Upload from './pages/upload.page';

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

          { authorized ? (            
            <Route exact path="/upload" render={ props => (
              <Upload />
            )} />
          ) : (<RedirectToLogin />)
          }

          { authorized ? (            
            <Route exact path="/files" render={ props => (
              <Files />
            )} />
          ) : (<RedirectToLogin />)
          }

          { authorized ? (            
            <Route exact path="/settings" render={ props => (
              <Settings />
            )} />
          ) : (<RedirectToLogin />)
          }

          { authorized ? (            
            <Route exact path="/settings/connection" render={ props => (
              <ConnectionSettings />
            )} />
          ) : (<RedirectToLogin />)
          }

          { authorized ? (            
            <Route exact path="/settings/accounts" render={ props => (
              <AccountSettings />
            )} />
          ) : (<RedirectToLogin />)
          }

          { authorized ? (            
            <Route exact path="/settings/accounts/add" render={ props => (
              <AddAccount />
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
