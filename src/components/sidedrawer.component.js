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
import FolderIcon from '@material-ui/icons/Folder';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';

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
    color: theme.palette.text.primary,
    '&:focus': {
      color: theme.palette.text.primary,
    },
    '&:active': {
      color: theme.palette.text.primary,
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
    <UserContext.Consumer>
      {user => (
        <Drawer open={props.open} onClose={ props.onDrawerClose }>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.list}>
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar className={classes.pinkAvatar}>{user.firstname === undefined ? '' : user.firstname.substr(0, 1)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.firstname + ' ' + user.lastname}
                  />
                </ListItem>
              </List>
              <Divider />
              <List>
                <Link to="/" className={classes.link} >
                  <ListItem button selected={ props.selectedPage === 'home' }>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
                <Link to="/controls" className={classes.link} >
                  <ListItem button selected={ props.selectedPage === 'controls' }>
                    <ListItemIcon><ControlCameraIcon /></ListItemIcon>
                    <ListItemText primary="Controls" />
                  </ListItem>
                </Link>
                <Link to="/files" className={classes.link} >
                  <ListItem button selected={ props.selectedPage === 'files' }>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Files" />
                  </ListItem>
                </Link>
              </List>
              <Divider />
              <List>
                <Link to="/settings" className={classes.link} >
                  <ListItem button selected={ props.selectedPage === 'files' }>
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
      )}
    </UserContext.Consumer>
  );
}