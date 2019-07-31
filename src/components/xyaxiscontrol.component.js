import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
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
}));

export default function XYAxisControl() {
  const classes = useStyles();

  return (
    <Grid container item sm={6} spacing={1}>
      <Grid container item xs={12} spacing={1} justify="center">
        <Grid item xs={4}>
          <Button variant="contained" className={classes.button}>
            <KeyboardArrowUpIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={1} justify="center">
        <Grid item xs={false}>
          <Button variant="contained" className={classes.button}>
            <KeyboardArrowLeftIcon />
          </Button>
          <Button variant="contained" className={classes.button}>
            <HomeIcon />
          </Button>
          <Button variant="contained" className={classes.button}>
            <KeyboardArrowRightIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={1} justify="center">
        <Grid item xs={4}>
          <Button variant="contained" className={classes.button}>
            <KeyboardArrowDownIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}