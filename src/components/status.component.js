import React, { useState } from 'react';
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

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.printer.info.name}
            </Typography>
            <Typography component="span" variant="subtitle1" color={props.printer.status.ready ? 'textSecondary' : 'error'}>
              {props.printer.status.ready ? 'Connected' : 'Not Connected'}
            </Typography>
            <Typography component="span" variant="subtitle1">
              {props.printer.status.ready ? (<div>&nbsp;-&nbsp</div>) : (<div></div>)}
            </Typography>
            <Typography component="span" variant="subtitle1" color="primary">
              {props.printer.status.ready ? props.printer.status.busy ? 'Printing...' : 'Ready' : (<div></div>)}
            </Typography>
            <Typography variant="subtitle1" color={loadedFile.id !== null ? 'initial' : 'error'}>
              { !props.printer.status.ready || loadedFile.id !== null ? loadedFile.name : 'No file loaded' }
            </Typography>
            { !props.printer.status.ready || loadedFile.id !== null ? (<div></div>): (
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
            <IconButton aria-label="pause" disabled={!props.printer.status.ready && !props.printer.status.busy}>
              <PauseIcon />
            </IconButton>
            <IconButton aria-label="play" disabled={(!props.printer.status.ready && props.printer.status.busy) || loadedFile.id === null}>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="stop" disabled={!props.printer.status.ready && !props.printer.status.busy}>
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