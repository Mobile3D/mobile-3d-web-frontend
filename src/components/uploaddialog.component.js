import React, { forwardRef, useImperativeHandle, useState } from 'react';
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

import { uploadService } from '../services/uploads.service';

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

const UploadDialog = forwardRef((props, ref) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  useImperativeHandle(ref, () => ({

    handleOpen() {
      setOpen(true);
    }

  }));

  const onCancel = () => {
    setFile(null);
    setOpen(false);
  }

  const handleFileDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files[0].size % 4096 !== 0 && e.dataTransfer.files[0].size !== 0) {
      setFile(e.dataTransfer.files[0]);
    }

  }

  const handleUploadButtonClick = () => {

    if (file !== null) {

      uploadService.add({
        file: file
      })
      .then((data) => {
        console.log(data);
      });

    }

  }

  return (
    <div onDrop={handleFileDrop}>
      <Dialog fullScreen open={open} onClose={onCancel} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onCancel} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Upload Files
            </Typography>
            <Button color="inherit" onClick={handleUploadButtonClick}>
              UPLOAD
            </Button>
          </Toolbar>
        </AppBar>

        { file !== null ? (
          <List>             
            <ListItem button>
              <ListItemText primary={file.name} secondary={file.size / 1000 + ' KB'} />
            </ListItem>
            <Divider />
          </List>

        ) : (

          <div className={classes.root}>
            <Typography align="center" color="textSecondary" gutterBottom>
              <InsertDriveFileIcon className={classes.icon} />
            </Typography>
            <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
              Drop your file here
            </Typography>
          </div>

        )}

      </Dialog>
    </div>
  );
});

export default UploadDialog;