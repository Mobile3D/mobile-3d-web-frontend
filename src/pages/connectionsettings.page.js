import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dashboard from '../components/dashboard.component';

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

  const [txtPort, setTxtPort] = useState('COM3');
  const [txtBaudRate, setTxtBaudRate] = useState('250000');

  function handleTxtPortChange(e) {
    setTxtPort(e.target.value);
  }

  function handleTxtBaudRateChange(e) {
    setTxtBaudRate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Dashboard navTitle="Connection Settings">
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
    </Dashboard>
  );
}