import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';

import Dashboard from '../components/dashboard.component';
import Snackbar from '../components/snackbar.component';
import { connectionService } from '../services/connection.service';
import { checkResponse } from '../helpers/api.helper';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(12),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1/4),
    marginRight: theme.spacing(1/4),
    marginBottom: 0,
    marginTop: 0
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  icon: {
    fontSize: 35,
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  centering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function ConnectionSettings() {
  const classes = useStyles();
  const snackbar = useRef();

  const [txtPort, setTxtPort] = useState('');
  const [txtBaudRate, setTxtBaudRate] = useState('');
  const [txtPortError, setTxtPortError] = useState({
    error: false,
    message: ''
  });
  const [txtBaudRateError, setTxtBaudRateError] = useState({
    error: false,
    message: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });

  useEffect(() => {

    connectionService.getConnection().then((data) => {

      if (checkResponse(data)) {
        setTxtPort(data.port);
        setTxtBaudRate(data.baudrate);
      }

    });

  }, []);

  function handleTxtPortChange(e) {
    setTxtPort(e.target.value);
    checkTxtPort(e.target.value);
  }

  function handleTxtBaudRateChange(e) {
    setTxtBaudRate(e.target.value);
    checkTxtBaudRate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!checkTxtPort(txtPort)) {
      valid = false;
    }
    if (!checkTxtBaudRate(txtBaudRate)) {
      valid = false;
    }
    
    if (valid) {
      connectionService.setConnection({
        port: txtPort,
        baudrate: txtBaudRate
      }).then((data) => {

        const responseCheck = checkResponse(data);

        if (responseCheck.valid) {
          setSnackbarMessage({
            type: 'success',
            message: 'Connection details successfully set. The server will restart now.'
          });

          snackbar.current.handleOpen();

          setTimeout(() => {
            console.log('restarting...');
            window.location.reload();
          }, 2000);

        } else {
          setSnackbarMessage({
            type: responseCheck.type,
            message: responseCheck.message
          });
          snackbar.current.handleOpen();
        }

      });
    }
  }

  function checkTxtPort(port) {
    if (validator.isEmpty(port)) {
      setTxtPortError({
        error: true,
        message: 'Please enter a port.'
      });
      return false;
    } else {
      resetTxtPortError();
      return true;
    }
  }

  function resetTxtPortError() {
    setTxtPortError({
      error: false,
      message: ''
    });
  }

  function checkTxtBaudRate(baudrate) {
    if (validator.isEmpty(baudrate)) {
      setTxtBaudRateError({
        error: true,
        message: 'Please enter a valid baudrate.'
      });
      return false;
    } else if (!validator.isNumeric(baudrate)) {
      setTxtBaudRateError({
        error: true,
        message: 'Baudrate must be a number.'
      });
      return false;
    } else {
      resetTxtBaudRateError();
      return true;
    }
  }

  function resetTxtBaudRateError() {
    setTxtBaudRateError({
      error: false,
      message: ''
    });
  }

  return (
    <Dashboard navTitle="Connection Settings" backTo="settings">
      <main className={classes.main}>
        <CssBaseline />
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
          Connection
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtPort"
                autoComplete="port"
                margin="normal"
                label="Port"
                variant="outlined" 
                value={txtPort}
                onChange={handleTxtPortChange}
                error={txtPortError.error}
                helperText={txtPortError.message}

              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtBaudRate"
                autoComplete="Baudrate"
                margin="normal"
                label="Baudrate"
                variant="outlined" 
                value={txtBaudRate}
                onChange={handleTxtBaudRateChange}
                error={txtBaudRateError.error}
                helperText={txtBaudRateError.message}

              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={false}
            >
              {'Save'/*this.state.loading ? 'Bitte warten...' : 'Speichern'*/}
            </Button>
          </form>
          </Paper>
          <div className={classes.centering}>
            <Button className={classes.button} onClick={() => {window.history.back()}} >Back</Button>
          </div>
      </main>
      <Snackbar 
        message={snackbarMessage.message} 
        variant={snackbarMessage.type}
        ref={snackbar} 
      />
    </Dashboard>
  );
}