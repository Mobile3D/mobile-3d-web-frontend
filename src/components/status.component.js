import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import { Link } from 'react-router-dom';

import { printerService } from '../services/printer.service';

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: '90vw'
    },
    textAlign: 'center',
  },
  controls: {
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  buttonGroup: {
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: '#0078d7',
    '&:focus': {
      color: '#0078d7',
    },
    '&:active': {
      color: '#0078d7',
    },
  },
}));

export default function Status(props) {
  const classes = useStyles();

  const [loadedFile, setLoadedFile] = useState({ id: window.sessionStorage.getItem('print_file_id'), name: window.sessionStorage.getItem('print_file_name')});
  const [printerStatus, setPrinterStatus] = useState({});
  const [printStatus, setPrintStatus] = useState('');
  const [printerStatusPromiseResolved, setPrinterStatusPromiseResolved] = useState(false);

  useEffect(() => {
    printerService.getStatus().then((data) => {
      setPrinterStatus(data);
      setPrinterStatusPromiseResolved(true);
    });
  }, []);

  const handlePlayButtonClick = (e) => {
    props.socket.emit('printFile', window.sessionStorage.getItem('print_file_id'));
    setPrinterStatus({
      connected: printerStatus.connected,
      ready: false,
      busy: printerStatus.busy
    });
  }

  const handleStopButtonClick = (e) => {
    props.socket.emit('cancelPrint');
  }

  props.socket.on('printLog', (e) => {
    //console.log(e);
  });

  props.socket.on('printStatus', (status) => {
    
    if (status !== printStatus) {
      setPrintStatus(status);
      if (status === 'ready') {
        setPrinterStatus({
          connected: printerStatus.connected,
          ready: true,
          busy: printerStatus.busy
        });
      } else if (status === 'printing') {
        setPrinterStatus({
          connected: printerStatus.connected,
          ready: false,
          busy: printerStatus.busy
        });
      } else if (status === 'completed') {
        window.sessionStorage.removeItem('print_file_id');
        window.sessionStorage.removeItem('print_file_name');
        setLoadedFile({
          id: null,
          name: null
        });
      } else if (status === 'stopped') {
        setPrinterStatus({
          connected: printerStatus.connected,
          ready: true,
          busy: printerStatus.busy
        });
      }
    }

  });

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.printer.info.name}
            </Typography>
            <Typography component="span" variant="subtitle1" color={printerStatus.connected ? 'textSecondary' : 'error'}>
              {printerStatus.connected ? 'Connected' : 'Not Connected'}
            </Typography>
            <Typography component="span" variant="subtitle1">
              {printerStatus.connected ? (<span>&nbsp;-&nbsp;</span>) : (<span></span>)}
            </Typography>
            <Typography component="span" variant="subtitle1" color={printStatus === 'stopping' ? 'error' : 'primary'}>
              {printerStatus.connected ? !printerStatus.ready ? printStatus === 'stopping' ? 'Stopping...' : 'Printing...' : 'Ready' : (<div></div>)}
            </Typography>
            <Typography variant="subtitle1" color={loadedFile.id !== null ? 'initial' : 'error'}>
              { !printerStatus.connected || loadedFile.id !== null ? loadedFile.name : 'No file loaded' }
            </Typography>
            { !printerStatus.connected || loadedFile.id !== null ? (<div></div>): (
              <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
                <Button>
                  <Link to="/files" className={classes.link} >
                    Choose From Files
                  </Link>
                </Button>
              </ButtonGroup>
            )}
          </CardContent>
          <div className={classes.controls}>
            {/* <IconButton aria-label="pause" disabled={!printerStatus.ready && !printerStatus.busy}>
              <PauseIcon />
            </IconButton> */}
            <IconButton aria-label="play" disabled={!(printerStatus.connected && printerStatus.ready && loadedFile.id !== null)} onClick={handlePlayButtonClick}>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="stop" disabled={!(printerStatus.connected && !printerStatus.ready) || printStatus === 'stopping'} onClick={handleStopButtonClick}>
              <StopIcon />
            </IconButton>
          </div>
        </div>
        {/* 
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
        */}
      </Card>
    </div>
  );
}