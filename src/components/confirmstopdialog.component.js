import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmStopDialog(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onCancelStop}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Are you sure you want to stop printing "{props.itemName}"?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you stop this print, <b>this action cannot be undone</b> and <b>you will have to start over again.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onConfirmDelete} color="primary">
            Yes
          </Button>
          <Button onClick={props.onCancelDelete} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}