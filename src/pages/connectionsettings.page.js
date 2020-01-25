import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import validator from 'validator';

import Dashboard from '../components/dashboard.component';
import Snackbar from '../components/snackbar.component';
import { connectionService } from '../services/connection.service';
import { checkResponse } from '../helpers/api.helper';
import Spinner from '../components/spinner.component';
import { useInterval } from '../hooks/interval.hook';

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

  const [availablePorts, setAvailablePorts] = useState([]);
  const [selPort, setSelPort] = useState('');
  const [selPortOpen, setSelPortOpen] = useState(false);
  const [txtBaudRate, setTxtBaudRate] = useState('');
  const [txtBaudRateError, setTxtBaudRateError] = useState({
    error: false,
    message: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });
  const [getConnectionPromiseResolved, setGetConnectionPromiseResolved] = useState(false);
  const [getPortsPromiseResolved, setGetPortsPromiseResolved] = useState(false);

  const inputLabel = useRef();
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (getConnectionPromiseResolved && getPortsPromiseResolved) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, [getPortsPromiseResolved, getConnectionPromiseResolved]);

  useEffect(() => {

    connectionService.getConnection().then((data) => {

      if (checkResponse(data)) {
        setSelPort(data.port);
        setTxtBaudRate(data.baudrate);
      }

      setGetConnectionPromiseResolved(true);

    });

    connectionService.getPorts().then((data) => {

      if (checkResponse(data)) {
        setAvailablePorts(data);
      }

      setGetPortsPromiseResolved(true);
      
    });

  }, []);

  useInterval(() => {

    connectionService.getPorts().then((data) => {

      if (checkResponse(data)) {
        setAvailablePorts(data);
      }

      setGetPortsPromiseResolved(true);
      
    });

  }, 2000);

  function handleSelPortOpen() {
    setSelPortOpen(true);
  }

  function handleSelPortClose() {
    setSelPortOpen(false);
  }

  function handleSelPortChange(e) {
    setSelPort(e.target.value);
  }

  function handleTxtBaudRateChange(e) {
    setTxtBaudRate(e.target.value);
    checkTxtBaudRate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!checkTxtBaudRate(txtBaudRate)) {
      valid = false;
    }
    
    if (valid) {
      connectionService.setConnection({
        port: selPort,
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

        { !getConnectionPromiseResolved || !getPortsPromiseResolved ? (
          <Spinner />
        ) : (
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Port
              </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  variant="outlined" 
                  open={selPortOpen}
                  onClose={handleSelPortClose}
                  onOpen={handleSelPortOpen}
                  value={selPort}
                  onChange={handleSelPortChange}
                  labelWidth={labelWidth}
                >

                  { availablePorts.map((port) => (
                    <MenuItem key={port.comName} value={port.comName}>{port.comName + ' (' + port.manufacturer + ')'}</MenuItem>
                  ))}

                </Select>
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
        )}

      </main>
      <Snackbar 
        message={snackbarMessage.message} 
        variant={snackbarMessage.type}
        ref={snackbar} 
      />
    </Dashboard>
  );
}