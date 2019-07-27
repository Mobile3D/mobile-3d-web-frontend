import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import pink from '@material-ui/core/colors/pink';
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import FolderIcon from '@material-ui/icons/Folder';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[400],
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:focus': {
      color: '#0078d7',
    },
    '&:active': {
      color: '#0078d7',
    },
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <Drawer open={props.open} onClose={ props.onDrawerClose }>
      <div
        tabIndex={0}
        role="button"
      >
        <div className={classes.list}>
          <List>
            <ListItem button>
              <ListItemAvatar>
  <Avatar className={classes.pinkAvatar}>{/* this.context.user.firstname.substring(0, 1) */ 'T'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={/* this.context.user.firstname + ' ' + this.context.user.lastname */ 'Test User'}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <Link to="/" className={classes.link} >
              <ListItem button selected={ props.selectedPage === 'start' }>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/print" className={classes.link} >
              <ListItem button selected={ props.selectedPage === 'dishes' }>
                <ListItemIcon><PrintIcon /></ListItemIcon>
                <ListItemText primary="Print" />
              </ListItem>
            </Link>
            <Link to="/controls" className={classes.link} >
              <ListItem button selected={ props.selectedPage === 'cookbooks' }>
                <ListItemIcon><ControlCameraIcon /></ListItemIcon>
                <ListItemText primary="Controls" />
              </ListItem>
            </Link>
            <Link to="/files" className={classes.link} >
              <ListItem button selected={ props.selectedPage === 'categories' }>
                <ListItemIcon><FolderIcon /></ListItemIcon>
                <ListItemText primary="Files" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/settings" className={classes.link} >
              <ListItem button>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  );
}