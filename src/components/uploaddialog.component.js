import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Slide from '@material-ui/core/Slide';

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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  icon: {
    fontSize: 125,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.onCancel} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.onCancel} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Upload File
            </Typography>
            <Button color="inherit" onClick={props.onCancel}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>

        {/* <List>
          <ListItem button>
            <ListItemText primary="t1.gcode" secondary="GCODE-File" />
          </ListItem>
        </List> */}

        <div className={classes.root}>
          <Typography align="center" color="textSecondary" gutterBottom>
            <InsertDriveFileIcon className={classes.icon} />
          </Typography>
          <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
            Drop your files here
          </Typography>
        </div>

      </Dialog>
    </div>
  );
}