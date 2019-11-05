import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { printerService } from '../services/printer.service';
import { checkResponse } from '../helpers/api.helper';
import { PrinterContext } from '../contexts/printer.context';

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

export default function PrinterSettings() {
  const classes = useStyles();
  const snackbar = useRef();
  const printer = useContext(PrinterContext);

  const [txtName, setTxtName] = useState('');
  const [txtNameError, setTxtNameError] = useState({
    error: false,
    message: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });

  useEffect(() => {

    printerService.getInfo().then((data) => {

      if (checkResponse(data)) {
        setTxtName(data.name);
      }

    });

  }, []);

  function handleTxtNameChange(e) {
    setTxtName(e.target.value);
    checkTxtName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!checkTxtName(txtName)) {
      valid = false;
    }
    
    if (valid) {
      printerService.setInfo({
        name: txtName,
      }).then((data) => {

        const responseCheck = checkResponse(data);

        if (responseCheck.valid) {
          printer.setInfo({
            name: data.name
          });

          setSnackbarMessage({
            type: 'success',
            message: 'Printer Details successfully set.'
          });

          snackbar.current.handleOpen();

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

  function checkTxtName(name) {
    if (validator.isEmpty(name)) {
      setTxtNameError({
        error: true,
        message: 'Please enter a name.'
      });
      return false;
    } else {
      resetTxtNameError();
      return true;
    }
  }

  function resetTxtNameError() {
    setTxtNameError({
      error: false,
      message: ''
    });
  }

  return (
    <Dashboard navTitle="Printer Settings" backTo="settings">
      <main className={classes.main}>
        <CssBaseline />
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
          Printer Details
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtName"
                autoComplete="name"
                margin="normal"
                label="Name"
                variant="outlined" 
                value={txtName}
                onChange={handleTxtNameChange}
                error={txtNameError.error}
                helperText={txtNameError.message}

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