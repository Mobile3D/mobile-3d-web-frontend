import React from 'react';
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

export default function Status() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              My Mobile 3D-Printer
            </Typography>
            <Typography component="span" variant="subtitle1" color="textSecondary">
              Connected
            </Typography>
            <Typography component="span" variant="subtitle1">
              &nbsp;-&nbsp;
            </Typography>
            <Typography component="span" variant="subtitle1" color="primary">
              Ready
            </Typography>
            <Typography variant="subtitle1" color="error">
              No file loaded
            </Typography>
            <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
              <Button>
                <Link to="/upload" className={classes.link} >
                  Upload
                </Link>
              </Button>
              <Button>
                <Link to="/files" className={classes.link} >
                  Choose From Files
                </Link>
              </Button>
            </ButtonGroup>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="pause" disabled>
              <PauseIcon />
            </IconButton>
            <IconButton aria-label="play" disabled>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="stop" disabled>
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