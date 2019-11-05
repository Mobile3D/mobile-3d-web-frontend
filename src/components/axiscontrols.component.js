import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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
  lengthSet: {
    marginTop: theme.spacing(2),
  },
}));

export default function AxisControls() {
  const classes = useStyles();

  const [selectedLengthButton, setSelectedLengthButton] = useState(1);

  const handleSelectedLengthButtonClick = (b) => {
    setSelectedLengthButton(b);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="center">
        <XYAxisControl />
        <ZAxisControl />
      </Grid>
      <Grid className={classes.lengthSet} container justify="center">
        <ButtonGroup
          size="large"
          variant="contained"
          aria-label="large contained button group"
        >
          <Button color={ selectedLengthButton === 1 ? 'primary' : 'default'} onClick={() => handleSelectedLengthButtonClick(1)}>1mm</Button>
          <Button color={ selectedLengthButton === 10 ? 'primary' : 'default'} onClick={() => handleSelectedLengthButtonClick(10)}>10mm</Button>
          <Button color={ selectedLengthButton === 100 ? 'primary' : 'default'} onClick={() => handleSelectedLengthButtonClick(100)}>100mm</Button>
        </ButtonGroup>
        </Grid>
    </div>
  );
}