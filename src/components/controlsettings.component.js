import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { subscribeToEvent, emitEvent, unsubscribeFromEvent } from '../services/socket.service';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    textAlign: 'center',
    width: '100%'
  },
  button: {
    width: 80,
    height: 80,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      width: 60,
      height: 60,
    }
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  lengthSet: {
    marginTop: theme.spacing(2),
  },
  settingsButton: {
    marginBottom: theme.spacing(1),
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      width: '90vw'
    },
  },
}));

export default function ControlSettings(props) {
  const classes = useStyles();

  const [fanState, setFanState] = useState(0);
  const [numFanSpeed, setNumFanSpeed] = useState('');
  const [numLength, setNumLength] = useState('');
  const [numTemperature, setNumTemperature] = useState('');
  const [printStatus, setPrintStatus] = useState('');
  const [printTemperature, setPrintTemperature] = useState({ hotend: { current: 0, set: 0 }, heatbed: { current: 0, set: 0 }});

  useEffect(() => {

    subscribeToEvent('info', (data) => {
      setPrintStatus(data.status);
      setPrintTemperature(data.temperature);
    });

    subscribeToEvent('printStatus', (status) => {
      setPrintStatus(status);
    });

    subscribeToEvent('temperature', (temp) => {
      setPrintTemperature(temp);
    });

    return () => {
      unsubscribeFromEvent('info');
      unsubscribeFromEvent('printStatus');
      unsubscribeFromEvent('temperature');
    }

  }, []);

  const handleFanState = (state) => {
    setFanState(state);

    if (state === 0) {
      emitEvent('fanOff');
    } else {
      emitEvent('fanOn', numFanSpeed);
    }

  }

  const handleNumFanSpeedChange = (e) => {
    if (e.target.value === '') {
      setNumFanSpeed(null);
    }

    if (e.target.value > 0 && e.target.value <= 100) {
      setNumFanSpeed(e.target.value);
      if (fanState === 1) {
        emitEvent('fanOn', numFanSpeed);
      }
    }
  }

  const handleNumLengthChange = (e) => {
    if (e.target.value === '') {
      setNumLength('');
    }

    if (e.target.value > 0 && e.target.value <= 300) {
      setNumLength(e.target.value);
    }
  }

  const handleNumTemperatureChange = (e) => {
    if (e.target.value === '') {
      setNumTemperature('');
    } else if (e.target.value >= 0 && e.target.value <= 300) {
      setNumTemperature(e.target.value);
    }
  }

  const handleExtrudeClick = () => {
    emitEvent('extrude', numLength);
  }

  const handleRetractClick = () => {
    emitEvent('retract', numLength);
  }

  const handleSetHeatbedClick = () => {
    emitEvent('setHeatbedTemperature', numTemperature);
  }

  const handleSetHotendClick = () => {
    emitEvent('setHotendTemperature', numTemperature);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                Fan
              </Typography>
              <div className={classes.settingsButton}>
                <TextField
                  id="fanSpeed"
                  className={classes.textField}
                  label="Speed (%)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleNumFanSpeedChange}
                  value={numFanSpeed}
                  disabled={printStatus === 'disconnected'}
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" size="small" color={ fanState === 1 ? 'primary' : 'default'} onClick={() => handleFanState(1)} fullWidth disabled={printStatus === 'disconnected'}>On</Button></div>
              <div><Button variant="contained" size="small" color={ fanState === 0 ? 'primary' : 'default'} onClick={() => handleFanState(0)} fullWidth disabled={printStatus === 'disconnected'}>Off</Button></div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                Extrude/Retract
              </Typography>
              <div className={classes.settingsButton}>
                <TextField
                  id="length"
                  className={classes.textField}
                  label="Length (mm)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleNumLengthChange}
                  value={numLength}
                  disabled={printStatus !== 'ready'}
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" disabled={printStatus !== 'ready'} size="small" fullWidth onClick={handleExtrudeClick}>Extrude</Button></div>
              <div><Button variant="contained" disabled={printStatus !== 'ready'} size="small" fullWidth onClick={handleRetractClick}>Retract</Button></div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                Temperature
              </Typography>
              <div className={classes.settingsButton}>
                <TextField
                  id="temp"
                  className={classes.textField}
                  label="Temperature (°C)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleNumTemperatureChange}
                  value={numTemperature}
                  disabled={printStatus === 'disconnected'}
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" size="small" fullWidth onClick={handleSetHeatbedClick} disabled={printStatus === 'disconnected'}>Set Heatbed {printTemperature.heatbed.set !== 0 ? '(' + printTemperature.heatbed.set + '°C)' : ''}</Button></div>
              <div><Button variant="contained" size="small" fullWidth onClick={handleSetHotendClick} disabled={printStatus === 'disconnected'}>Set Hotend {printTemperature.hotend.set !== 0 ? '(' + printTemperature.hotend.set + '°C)' : ''}</Button></div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}