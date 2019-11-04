import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


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

export default function ControlSettings() {
  const classes = useStyles();

  const [fanState, setFanState] = useState(0);
  const [numFanSpeed, setNumFanSpeed] = useState(1);

  const handleFanState = (state) => {
    setFanState(state);
  }

  const handleFanSpeedChange = (e) => {
    if (e.target.value > 0 && e.target.value <= 100) {
      setNumFanSpeed(e.target.value);
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h5">
        Settings
      </Typography>
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
                  label="Speed"
                  variant="outlined"
                  type="number"
                  fullWidth
                  disabled={ fanState === 0 ? true : false}
                  onChange={handleFanSpeedChange}
                  value={numFanSpeed}
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" size="small" color={ fanState === 1 ? 'primary' : 'default'} onClick={() => handleFanState(1)} fullWidth>On</Button></div>
              <div><Button variant="contained" size="small" color={ fanState === 0 ? 'primary' : 'default'} onClick={() => handleFanState(0)} fullWidth>Off</Button></div>
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
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" size="small" fullWidth>Extrude</Button></div>
              <div><Button variant="contained" size="small" fullWidth>Retract</Button></div>
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
                />
              </div>
              <div className={classes.settingsButton}><Button variant="contained" size="small" fullWidth>Set Heatend</Button></div>
              <div><Button variant="contained" size="small" fullWidth>Set Hotend</Button></div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}