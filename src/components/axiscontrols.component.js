import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HomeIcon from '@material-ui/icons/Home';

import { printerService } from '../services/printer.service';

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

export default function AxisControls(props) {
  const classes = useStyles();

  const [selectedLength, setSelectedLength] = useState(10);
  const [printerStatus, setPrinterStatus] = useState({});
  const [printerStatusPromiseResolved, setPrinterStatusPromiseResolved] = useState(false);

  const handleSelectedLengthClick = (b) => {
    setSelectedLength(b);
  }

  useEffect(() => {
    printerService.getStatus().then((data) => {
      setPrinterStatus(data);
      setPrinterStatusPromiseResolved(true);
    });
  }, []);

  const handleMoveButtonClick = (direction) => {
    props.socket.emit(direction, selectedLength);
  }

  props.socket.on('printStatus', (status) => {
    if (status !== 'ready' && status !== 'connected') {
      setPrinterStatus({
        connected: printerStatus.connected,
        ready: true,
        busy: printerStatus.busy
      });
    } else {
      setPrinterStatus({
        connected: printerStatus.connected,
        ready: true,
        busy: printerStatus.busy
      });
    }
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="center">

        {/* XY */}
        <Grid container item sm={6} spacing={1}>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={4}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveForward')}>
                <KeyboardArrowUpIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={false}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveLeft')}>
                <KeyboardArrowLeftIcon />
              </Button>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveXYHome')}>
                <HomeIcon />
              </Button>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveRight')}>
                <KeyboardArrowRightIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={4}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveBack')}>
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Z */}
        <Grid container item spacing={1} sm={6}>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={4}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveUp')}>
                <KeyboardArrowUpIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={false}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveZHome')}>
                <HomeIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item xs={4}>
              <Button variant="contained" disabled={!printerStatusPromiseResolved || !printerStatus.ready} className={classes.button} onClick={() => handleMoveButtonClick('moveDown')}>
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
      <Grid className={classes.lengthSet} container justify="center">
        <ButtonGroup
          size="large"
          variant="contained"
          aria-label="large contained button group"
          disabled={!printerStatusPromiseResolved || !printerStatus.ready}
        >
          <Button color={ selectedLength === 1 ? 'primary' : 'default'} onClick={() => handleSelectedLengthClick(1)}>1mm</Button>
          <Button color={ selectedLength === 10 ? 'primary' : 'default'} onClick={() => handleSelectedLengthClick(10)}>10mm</Button>
          <Button color={ selectedLength === 100 ? 'primary' : 'default'} onClick={() => handleSelectedLengthClick(100)}>100mm</Button>
        </ButtonGroup>
        </Grid>
    </div>
  );
}