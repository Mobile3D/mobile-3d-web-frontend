import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Dashboard from '../components/dashboard.component';
import ActionCard from '../components/actioncard.component';
import Status from '../components/status.component';

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

export default function Home() {
  const classes = useStyles();

  return (
    <Dashboard navTitle="Home">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Welcome Back, {/* this.context.user.firstname */ 'Test User'}.
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Your 3D-Printer is Ready For You.
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
      <Grid container className={classes.root} spacing={4}>
        <Grid item xs={12}>
          <Grid container className={classes.options} justify="center" spacing={4}>
            <Grid item>
              <Link to="/controls" className={classes.link} >
                <ActionCard action="control" title="Controls" description="Print files, control the printer, move the axis" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/upload" className={classes.link} >
                <ActionCard action="upload" title="Upload" description="Add files to the printing list" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/files" className={classes.link} >
                <ActionCard action="files" title="Files" description="View uploaded files, load files, print them again" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

