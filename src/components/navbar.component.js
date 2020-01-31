import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PrintIcon from '@material-ui/icons/Print';
import PauseIcon from '@material-ui/icons/Pause';
import NotConnectedIcon from '@material-ui/icons/SignalCellularConnectedNoInternet4Bar';
import ConnectedIcon from '@material-ui/icons/SignalCellular4Bar';
import { Link } from 'react-router-dom';
import SideDrawer from './sidedrawer.component';
import { subscribeToStatus, subscribeToInfo, unsubscribeFromInfo, unsubscribeFromStatus, emitGetInfo } from '../services/socket.service';
import { useInterval } from '../hooks/interval.hook';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    '&:focus': {
      color: '#ffffff',
    },
    '&:active': {
      color: '#ffffff',
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const [showDrawer, setShowDrawer] = useState(false);
  const [printStatus, setPrintStatus] = useState('');
  const [printStatusPromiseResolved, setPrintStatusPromiseResolved] = useState(false);
  const [connectingIconDisabled, setConnectingIconDisabled] = useState(true);
  const [printIconDisabled, setPrintIconDisabled] = useState(true);

  function handleMenuButtonClick() {
    setShowDrawer(true);
  }

  function handleDrawerClose() {
    setShowDrawer(false);
  }

  useEffect(() => {

    subscribeToInfo((data) => {
      setPrintStatus(data.status);
      setPrintStatusPromiseResolved(true);
    });
    emitGetInfo();

    subscribeToStatus((status) => {
      setPrintStatus(status);
      setPrintStatusPromiseResolved(true);
    });

    return () => {
      unsubscribeFromInfo();
      unsubscribeFromStatus();
    }
  }, []);
  
  useInterval(() => {

    if (printStatus === 'connecting') {
      setConnectingIconDisabled(!connectingIconDisabled);
    }

    if (printStatus === 'stopping' || printStatus === 'pausing') {
      setPrintIconDisabled(!printIconDisabled);
    }

  }, 500);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {props.backTo !== undefined ? (
            <Link to={ props.backTo === 'settings' ? '/settings' : props.backTo === 'accountsettings' ? '/settings/accounts' : '/'} className={classes.link}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Back">
                <ArrowBackIcon />
              </IconButton> 
            </Link>
          ) : (
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={ handleMenuButtonClick }>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            { props.title }
          </Typography>
          
          { printStatus === 'pausing' || printStatus === 'paused' ? (
            <Tooltip title={printStatus === 'pausing' ? 'Pausing...' : 'Paused'}>
            <span>
              <IconButton color="inherit" disableRipple>
                <PauseIcon />
              </IconButton>
            </span>
          </Tooltip>
          ) : ''}

          <Tooltip title={printStatus !== 'ready' ? printStatus === 'stopping' || printStatus === 'pausing' ? 'Stopping...' : 'Printing...' : 'Ready'}>
            <span>
              <IconButton color="inherit" disableRipple disabled={(printStatus !== 'printing' && printStatus !== 'stopping' && printStatus !== 'pausing') || (printStatus === 'stopping' && printIconDisabled) || (printStatus === 'pausing' && printIconDisabled) || !printStatusPromiseResolved}>
                <PrintIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={printStatus !== 'disconnected' ? printStatus === 'connecting' ? 'Connecting...' : 'Connected' : 'Connection failed'}>
            <span>
              <IconButton color="inherit" disableRipple disabled={connectingIconDisabled && printStatus === 'connecting'}>
                { printStatus === 'disconnected' ? (<NotConnectedIcon />) : (<div></div>) }
                { printStatus !== 'disconnected' ? (<ConnectedIcon />) : (<div></div>) }
              </IconButton>
            </span>
          </Tooltip>

        </Toolbar>
      </AppBar>
      <SideDrawer open={showDrawer} onDrawerClose={ handleDrawerClose } selectedPage={ props.selectedPage } />
    </div>
  );
}