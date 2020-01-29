import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import { printerService } from '../services/printer.service';
import Spinner from '../components/spinner.component';
import ConfirmStopDialog from '../components/confirmstopdialog.component';
import CompletedDialog from '../components/competeddialog.component';
import { filesHelper } from '../helpers/files.helper';
import { subscribeToEvent, emitEvent, unsubscribeFromEvent } from '../services/socket.service';

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
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  progressbar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  temperature: {
    marginTop: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  status: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Status(props) {
  const classes = useStyles();

  const [loadedFile, setLoadedFile] = useState({ id: window.sessionStorage.getItem('print_file_id'), name: window.sessionStorage.getItem('print_file_name')});
  const [loadedFilePromiseResolved, setLoadedFilePromiseResolved] = useState(false);
  const [printStatus, setPrintStatus] = useState('');
  const [openConfirmStopDialog, setOpenConfirmStopDialog] = useState(false);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [printProgress, setPrintProgress] = useState({});
  const [printTemperature, setPrintTemperature] = useState({ hotend: { current: '...', set: '...' }, heatbed: { current: '...', set: '...' }});

  useEffect(() => {
    printerService.getLoadedFile().then((data) => {
      if (data.id !== null || data.name !== null) {
        setLoadedFile(data);
        filesHelper.setNextFile(data.id, data.name);
      }
      setLoadedFilePromiseResolved(true);
    });
  }, []);

  useEffect(() => {

    subscribeToEvent('info', (data) => {
      setPrintStatus(data.status);
      setPrintProgress((data.progress.sent/data.progress.total)*100);
      if (data.status === 'completed') {
        window.sessionStorage.removeItem('print_file_id');
        window.sessionStorage.removeItem('print_file_name');
        setLoadedFile({
          id: null,
          name: null
        });
        setOpenCompletedDialog(true);
      }
    });

    emitEvent('getInfo');

    subscribeToEvent('newFileToPrint', (file) => {
      window.sessionStorage.setItem('print_file_id', file.id);
      window.sessionStorage.setItem('print_file_name', file.name);
      setLoadedFile({id: file.id, name: file.name});
    });

    subscribeToEvent('deleteLoadedFile', () => {
      window.sessionStorage.removeItem('print_file_id');
      window.sessionStorage.removeItem('print_file_name');
      setLoadedFile({id: null, name: null});
      printerService.setLoadedFile({
        id: null,
        name: null
      });
    });

    subscribeToEvent('printStatus', (status) => {

      setPrintStatus(status);
      if (status === 'completed') {
        setOpenCompletedDialog(true);
        window.sessionStorage.removeItem('print_file_id');
        setLoadedFile({
          id: null,
          name: null
        });
        setPrintProgress(0);
        emitEvent('deleteLoadedFile');
      }

    });

    subscribeToEvent('printProgress', (progress) => {
      setPrintProgress((progress.sent/progress.total)*100);
    });

    subscribeToEvent('temperature', (temp) => {
      setPrintTemperature(temp);
    });

    return () => {
      unsubscribeFromEvent('info');
      unsubscribeFromEvent('newFileToPrint');
      unsubscribeFromEvent('deleteLoadedFile');
      unsubscribeFromEvent('printStatus');
      unsubscribeFromEvent('printProgress');
      unsubscribeFromEvent('temperature');
    }

  }, []);

  const handlePlayButtonClick = (e) => {
    if (printStatus === 'paused') {
      emitEvent('unpausePrint');
    } else {
      emitEvent('printFile', window.sessionStorage.getItem('print_file_id'));
    }
  }

  const handlePauseButtonClick = (e) => {
    emitEvent('pausePrint');
  }

  const handleStopButtonClick = (e) => {
    setOpenConfirmStopDialog(true);
  }

  const handleStopCancel = (e) => {
    setOpenConfirmStopDialog(false);
  }

  const handleStopConfirm = (e) => {
    setOpenConfirmStopDialog(false);
    emitEvent('cancelPrint');
  }

  const handleConfirmCompletedPrint = () => {
    setOpenCompletedDialog(false);
    window.sessionStorage.removeItem('print_file_name');
  }

  const handleDeleteClick = () => {
    window.sessionStorage.removeItem('print_file_id');
    window.sessionStorage.removeItem('print_file_name');
    setLoadedFile({
      id: null,
      name: null
    });
    emitEvent('deleteLoadedFile');
  }

  if (!loadedFilePromiseResolved) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            
            <Typography component="h5" variant="h5">
              {props.printer.info.name}
            </Typography>

            <div className={classes.status}>
              <Typography component="span" variant="subtitle1" color={printStatus !== 'disconnected' && printStatus !== 'pausing' ? 'textSecondary' : 'error'}>
                <b>{printStatus === 'connecting' ? 'Connecting...' : ''}</b>
                <b>{printStatus === 'disconnected' ? 'Not Connected' : ''}</b>
                <b>{printStatus === 'paused' ? 'Paused' : ''}</b>
              </Typography>
            </div>

            <div className={classes.status}>
              <Typography component="span" variant="subtitle1" color={printStatus === 'stopping' || printStatus === 'pausing' ? 'error' : 'primary'}>
                <b>{printStatus === 'ready' ? 'Ready' : ''}</b>
                <b>{printStatus === 'printing' ? 'Printing...' : ''}</b>
                <b>{printStatus === 'stopping' ? 'Stopping...' : ''}</b>
                <b>{printStatus === 'pausing' ? 'Pausing...' : ''}</b>
              </Typography>
            </div>

            {/* <Typography component="div" variant="subtitle1">
              <b>{ printStatus !== 'disconnected' && printStatus !== 'connecting' ? 'File' : '' }</b>
            </Typography> */}

            <Typography variant="subtitle1" color={loadedFile.id !== null ? 'initial' : 'error'}>
              { (printStatus !== 'disconnected' && printStatus !== 'connecting') && loadedFile.id !== null ? 

                (
                <div classes={classes.chip}>
                  { (printStatus === 'ready' && loadedFile.id !== null) || (printStatus === 'ready' && loadedFile.id !== null) ? (
                    <Chip label={loadedFile.name} onDelete={handleDeleteClick} />
                  ) : (
                    <Chip label={loadedFile.name} />
                  )}
                  
                </div>
                ) : '' }

              {/* { (printStatus !== 'disconnected' && printStatus !== 'connecting') && loadedFile.id === null ? 'No file loaded' : '' } */}
            </Typography>

            { printStatus === 'printing' || printStatus === 'stopping' || printStatus === 'pausing' || printStatus === 'paused' ? (
              <div>
                <LinearProgress className={classes.progressbar} variant="determinate" value={parseInt(printProgress)} />
                <Typography variant="subtitle1">
                  { Math.floor(printProgress) === 0 ? printStatus === 'pausing' || printStatus === 'paused' || printStatus === 'stopping' ? '0%' : 'starting...' : Math.floor(printProgress) + '%' }
                </Typography>
              </div>
            ) : (<div></div>) }

            { printStatus !== 'disconnected' && printStatus !== 'connecting' && loadedFile.id === null ? (
              <Button className={classes.button} variant="outlined" color="primary" aria-label="outlined primary button group">
                <Link to="/files" className={classes.link} >
                  Choose A File
                </Link>
              </Button>
            ) : (<div></div>)}
            
            <div className={classes.temperature}>
              <Typography component="div" variant="subtitle1">
                <b>{printStatus !== 'disconnected' && printStatus !== 'connecting' ? 'Temperature' : ''}</b>
              </Typography>

              <Typography component="div" variant="subtitle1" color="initial">
                {printStatus !== 'disconnected' && printStatus !== 'connecting' ? (
                  <table align="center">
                    <tbody>
                      <tr>
                        <td>Hotend:</td>
                        <td><b>{printTemperature.hotend.current + '°C'}</b></td>
                        <td>{'(' + printTemperature.hotend.set + '°C)'}</td>
                      </tr>
                      <tr>
                        <td>Heatbed:</td>
                        <td><b>{printTemperature.heatbed.current + '°C'}</b></td>
                        <td>{'(' + printTemperature.heatbed.set + '°C)'}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : ''}
              </Typography>
            </div>

          </CardContent>
          <div className={classes.controls}>
            
            <Tooltip title="Pause">
              <span>
                <IconButton aria-label="pause" disabled={printStatus !== 'printing' || printStatus === 'paused'} onClick={handlePauseButtonClick}>
                  <PauseIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={printStatus === 'pausing' || printStatus === 'paused' ? 'Continue' : 'Start'}>
              <span>
                <IconButton aria-label="play" disabled={!(printStatus !== 'disconnected' && (printStatus === 'ready' || printStatus === 'paused') && loadedFile.id !== null)} onClick={handlePlayButtonClick}>
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Cancel">
              <span>
                <IconButton aria-label="stop" disabled={!(printStatus !== 'disconnected' && printStatus !== 'ready') || printStatus === 'stopping' || printStatus === 'pausing' || printStatus === 'paused' || printStatus === 'connecting'} onClick={handleStopButtonClick}>
                  <StopIcon />
                </IconButton>
              </span>
            </Tooltip>
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

      <ConfirmStopDialog 
        open={openConfirmStopDialog} 
        itemName={loadedFile.name}
        deleteType="file"
        onCancelDelete={handleStopCancel} 
        onConfirmDelete={handleStopConfirm} 
      />

      <CompletedDialog 
        open={openCompletedDialog} 
        onConfirm={handleConfirmCompletedPrint} 
      />

    </div>
  );
}