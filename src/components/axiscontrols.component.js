import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import XYAxisControl from './xyaxiscontrol.component';
import ZAxisControl from './zaxiscontrol.component';

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
}));

export default function AxisControls() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h5">
        Axis Controls
      </Typography>
      <Grid container spacing={4} justify="center">
        <XYAxisControl />
        <ZAxisControl />
      </Grid>
    </div>
  );
}