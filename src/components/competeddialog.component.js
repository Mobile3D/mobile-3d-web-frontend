import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CompletedDialog(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onConfirmCompletedPrint}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Your item has been printed.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can remove your item from the printer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onConfirm} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}