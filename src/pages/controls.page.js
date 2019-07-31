import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Dashboard from '../components/dashboard.component';
import Status from '../components/status.component';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    /* to fix x-scroll with grid */
    margin: 0,
    width: '100%',
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
}));

export default function Controls() {
  const classes = useStyles();

  return (
    <Dashboard navTitle="Controls">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Controls
        </Typography>
      </div>
      <Grid container className={classes.root} spacing={4}>
        <Grid item xs={12}>
          <Grid container className={classes.options} justify="center" spacing={4}>
            <Grid item>
              <Status />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dashboard>
  );
}