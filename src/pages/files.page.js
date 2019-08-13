import React, { useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

import Dashboard from '../components/dashboard.component';
import Snackbar from '../components/snackbar.component';
import Spinner from '../components/spinner.component';
import { uploadService } from '../services/uploads.service';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    /* to fix x-scroll with grid */
    margin: 0,
    width: '100%',
  },
  options: {
    marginBottom: theme.spacing(2),
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  tableRoot: {
    margin: 0,
    width: '100%',
    marginBottom: theme.spacing(13),
  },
  table: {
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(20),
      marginRight: theme.spacing(20),
    },
  },
  rowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      /*cursor: 'pointer',*/
    },
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    
    zIndex: 2,
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

export default function Files(props) {
  const classes = useStyles();

  const [uploads, setUploads] = useState([]);
  const [uploadPromiseResolved, setUploadPromiseResolved] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });

  const snackbar = useRef();

  useEffect(() => {
    uploadService.getAll().then((data) => {
      if (checkResponse(data)) {
        setUploads(data);
      }
      setUploadPromiseResolved(true);
    });
  }, [])

  const checkResponse = (data) => {
    if (data.error === undefined) return true;
    else {
      
      if (data.error.code === 'ER_INTERNAL') {
        setSnackbarMessage({
          type: 'error',
          message: 'An internal error occured. Please try again in a few seconds.'
        });
      }

      snackbar.current.handleOpen();

    }
  }

  return (
    <Dashboard navTitle="Files">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Files
        </Typography>
      </div>
      <div className={classes.tableRoot}>

        { uploadPromiseResolved && uploads.length === 0 ? (
          <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            Upload some files to print them.
          </Typography>
        ) : uploadPromiseResolved && uploads.length > 0 ? (
          <Paper className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <Hidden xsDown={true}>
                    <TableCell>Size</TableCell>
                  </Hidden>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map(row => (
                  <TableRow className={classes.rowHover} key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.filename}
                    </TableCell>
                    <Hidden xsDown={true}>
                      <TableCell>{(row.size / 1000) + ' KB'}</TableCell>
                    </Hidden>
                    <TableCell align="right">
                      <IconButton className={classes.button} aria-label="Print">
                        <PrintIcon fontSize="small" />
                      </IconButton>
                      <IconButton className={classes.button} aria-label="Download">
                        <SaveAltIcon fontSize="small" />
                      </IconButton>
                      <IconButton className={classes.button} onClick={(e) => props.onDeleteClick(e, row)} aria-label="Delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : !uploadPromiseResolved ? (
          <Spinner/>
        ) : ''}
        
        <Link to="/upload" className={classes.link} >
          <Fab variant="extended" size="large" color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
            Upload File
          </Fab>
        </Link>
      </div>
      <Snackbar 
        message={snackbarMessage.message} 
        variant={snackbarMessage.type}
        ref={snackbar} 
      />
    </Dashboard>
  );
}

