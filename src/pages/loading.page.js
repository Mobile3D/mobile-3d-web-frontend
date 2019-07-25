import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Logo from '../images/icon-blue.svg';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    position: 'absolute',
    top: '50vh',
    transform: 'translateY(-50%)',
    left: '0px',
    right: '0px',
    margin: 'auto',
  },
  linearProgress: {
    marginTop: 50,
    margin: '0 25%',
  },
}));

export default function Loading() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <img src={Logo} alt="Logo" width={150} />
      <LinearProgress className={classes.linearProgress} />
    </div>
  );
}