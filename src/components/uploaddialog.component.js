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
import LinearProgress from '@material-ui/core/LinearProgress';

import { uploadService } from '../services/uploads.service';
import { checkResponse } from '../helpers/api.helper';
import { checkFile } from '../helpers/upload.helper';
import { filesHelper } from '../helpers/files.helper';
import { emitEvent } from '../services/socket.service';

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
  const [uploadStarted, setUploadStarted] = useState(false);

  useImperativeHandle(ref, () => ({

    handleOpen() {
      setOpen(true);
    },

    setUpload(upload) {
      if (checkFile(upload)) {
        setFile(upload);
      } else {
        handleClose();
        props.onBeforeUploadError({
          type: 'error',
          message: 'Files of this type cannot be uploaded. Please upload a GCODE file.'
        });
      }
    }

  }));

  const handleClose = () => {
    setFile(null);
    setOpen(false);
  }

  const handleFileDrop = (e) => {
    e.preventDefault();

    if (checkFile(e.dataTransfer.files[0])) {
      setFile(e.dataTransfer.files[0]);
    } else {
      handleClose();
      props.onBeforeUploadError({
        type: 'error',
        message: 'Files of this type cannot be uploaded. Please upload a GCODE file.'
      });
    }

  }

  const handleUploadButtonClick = () => {

    if (file !== null) {

      let body = new FormData();
      body.append('file', file);
      setUploadStarted(true);

      uploadService.add(body)
      .then((data) => {

        const responseCheck = checkResponse(data);

        if (responseCheck.valid) {
          filesHelper.setNextFile(data._id, data.originalname);
          emitEvent('loadFile', {id: data._id, name: data.originalname});
          props.onUploadFinish({
            type: 'success',
            message: 'File "' + data.originalname + '" successfully uploaded.'
          });
        } else {
          props.onUploadFinish({
            type: 'error',
            message: 'Files of this type cannot be uploaded.'
          });
        }

        setUploadStarted(false);

        handleClose();

      });

    }

  }

  return (
    <div onDrop={handleFileDrop}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Upload Files
            </Typography>
            <Button color="inherit" onClick={handleUploadButtonClick} disabled={uploadStarted}>
              UPLOAD
            </Button>
          </Toolbar>
        </AppBar>

        { file !== null ? (
          <List>             
            <ListItem button>
              <ListItemText primary={file.name} secondary={file.size / 1000 + ' KB'} />
            </ListItem>
            { uploadStarted ? (<LinearProgress className={classes.linearProgress} />) : (<Divider />) }
          </List>

        ) : (

          <div className={classes.root}>
            <Typography align="center" color="textSecondary" gutterBottom>
              <InsertDriveFileIcon className={classes.icon} />
            </Typography>
            <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
              Drop your GCODE file here
            </Typography>
          </div>

        )}

      </Dialog>
    </div>
  );
});

export default UploadDialog;