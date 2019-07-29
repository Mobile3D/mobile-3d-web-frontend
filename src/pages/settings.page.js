import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Dashboard from '../components/dashboard.component';
import SettingsCard from '../components/settingscard.component';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    /* to fix x-scroll with grid */
    margin: 0,
    width: '100%',
  },
  options: {
    marginBottom: theme.spacing(2),
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:focus': {
      color: '#0078d7',
    },
    '&:active': {
      color: '#0078d7',
    },
  },
}));

export default function Settings() {
  const classes = useStyles();

  return (
    <Dashboard navTitle="Settings">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Settings
        </Typography>
      </div>
      <Grid container className={classes.root} spacing={4}>
        <Grid item xs={12}>
          <Grid container className={classes.options} justify="center" spacing={4}>
            <Grid item>
              <Link to="/settings/connection" className={classes.link} >
                <SettingsCard action="connection" title="Connection" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/settings/accounts" className={classes.link} >
                <SettingsCard action="accounts" title="Accounts" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/settings/info" className={classes.link} >
                <SettingsCard action="info" title="Info" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

