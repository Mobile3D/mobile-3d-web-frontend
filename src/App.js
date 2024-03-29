import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './pages/login.page';
import Home from './pages/home.page';
import Settings from './pages/settings.page';
import AccountSettings from './pages/accountsettings.page';
import ConnectionSettings from './pages/connectionsettings.page';
import AddAccount from './pages/addaccount.page';
import Files from './pages/files.page';
import Controls from './pages/controls.page';
import Info from './pages/info.page';
import LoadingWithIcon from './pages/loading.page';

import { userService } from './services/users.service';
import { printerService } from './services/printer.service';
import { UserContext } from './contexts/user.context';
import { PrinterContext } from './contexts/printer.context';
import { ThemeContext } from './contexts/theme.context';
import PrinterSettings from './pages/printersettings.page';


//create consistent theme styling for app
const theme_light = createMuiTheme({
  palette: {
      primary:  {
          main: '#0078d7',
      },
      secondary: {
          main: '#ffffff',
      },
      type: 'light'
  },
  typography: {
      useNextVariants: true,
  },
});

const theme_dark = createMuiTheme({
  palette: {
      primary:  {
          main: '#0078d7',
      },
      secondary: {
          main: '#ffffff',
      },
      type: 'dark'
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

  const [authorized, setAuthorized] = useState(window.localStorage.getItem('token') !== null ? true : false);
  const [userPromiseResolved, setUserPromiseResolved] = useState(false);
  const [user, setUser] = useState({});
  const [printerStatus, setPrinterStatus] = useState({});
  const [printerInfo, setPrinterInfo] = useState({});
  const [themeStyle, setThemeStyle] = useState(window.localStorage.getItem('themeMode') !== null ? window.localStorage.getItem('themeMode') : 'light');

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {

      printerService.getStatus().then((data) => {
        setPrinterStatus(data);
      });
      
      userService.lookup().then((data) => {

        if (data._id === undefined) {
          setAuthorized(false);
          setUser({
            authorized: false
          });
          setUserPromiseResolved(true);
        } else {
          setAuthorized(true);
          data.authorized = true;
          setUser(data);
          setUserPromiseResolved(true);
        }

      });

      printerService.getInfo().then((data) => {
        setPrinterInfo(data);
      });

    } else {
      setUser({
        authorized: false
      });
      setUserPromiseResolved(true);
    }

  }, []);

  // if data has not been fetched yet
  if (!userPromiseResolved) {
    return (
      <ThemeContext.Provider value={{themeStyle: themeStyle, setThemeStyle: setThemeStyle}}>
        <MuiThemeProvider theme={themeStyle !== 'dark' ? theme_light : theme_dark}>
          <CssBaseline />
          <LoadingWithIcon />
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }

  // otherwise
  return (
    <ThemeContext.Provider value={{themeStyle: themeStyle, setThemeStyle: setThemeStyle}}>
      <MuiThemeProvider theme={themeStyle !== 'dark' ? theme_light : theme_dark}>
        <UserContext.Provider value={user}>
          <PrinterContext.Provider value={{ status: printerStatus, setStatus: setPrinterStatus, info: printerInfo, setInfo: setPrinterInfo }}>
            <Router>
              <div>
                <CssBaseline />

                { authorized ? (
                  <div>                          
                    <UserContext.Consumer>
                      {user => (
                        <PrinterContext.Consumer>
                          
                          {printer => (
                            <div>
                              <Route exact path="/" render={ props => (                        
                                <Home user={user} printer={printer} />        
                              )} />
  
                              <Route exact path="/controls" render={ props => (
                                <Controls printer={printer} />
                              )} />
  
                              <Route exact path="/files" render={ props => (
                                <Files />
                              )} />
  
                              <Route exact path="/settings" render={ props => (
                                <Settings />
                              )} />
  
                              <Route exact path="/settings/connection" render={ props => (
                                <ConnectionSettings />
                              )} />
  
                              <Route exact path="/settings/printer" render={ props => (
                                <PrinterSettings />
                              )} />
  
                              <Route exact path="/settings/accounts" render={ props => (
                                <AccountSettings {...props} />
                              )} />
  
                              <Route exact path="/settings/accounts/add" render={ props => (
                                <AddAccount {...props} />
                              )} />

                              <Route exact path="/settings/info" render={ props => (
                                <Info {...props} />
                              )} />
                            </div>
                          )}

                        </PrinterContext.Consumer> 
                      )}
                    </UserContext.Consumer>
                  </div>
                ) : (<RedirectToLogin />)
                }

                <Route exact path="/login" render={ props => (
                  <UserContext.Consumer>
                    { user => (
                      <Login user={user} />
                    )}
                  </UserContext.Consumer>
                )} />

              </div>
            </Router>
          </PrinterContext.Provider>
        </UserContext.Provider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
