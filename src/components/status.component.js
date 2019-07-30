import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Status() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Status
      </Typography>      
    </Paper>
  );
}