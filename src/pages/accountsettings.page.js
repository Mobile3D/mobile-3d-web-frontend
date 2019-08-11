import React, { useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

import Dashboard from '../components/dashboard.component';
import Spinner from '../components/spinner.component';
import Snackbar from '../components/snackbar.component';
import { userService } from '../services/user.service';

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
  centering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
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

export default function AccountSettings(props) {
  const classes = useStyles();

  const [accounts, setAccounts] = useState([]);
  const [userPromiseResolved, setUserPromiseResolved] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });

  const snackbar = useRef();

  useEffect(() => {
    userService.getAll().then((data) => {
      if (checkResponse(data)) {
        setAccounts(data);
      }
      setUserPromiseResolved(true);
    });
  }, []);

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
    <Dashboard navTitle="Account Settings">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Account Settings
        </Typography>
      </div>
      <div className={classes.tableRoot}>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
          Accounts
        </Typography>
        { userPromiseResolved ? (
          <Paper className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <Hidden xsDown={true}>
                    <TableCell>Firstname</TableCell>
                    <TableCell>Lastname</TableCell>
                  </Hidden>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map(row => (
                  <TableRow className={classes.rowHover} key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <Hidden xsDown={true}>
                      <TableCell>{row.firstname}</TableCell>
                      <TableCell>{row.lastname}</TableCell>
                    </Hidden>
                    <TableCell align="right">
                      <IconButton onClick={(e) => props.onDeleteClick(e, row)} aria-label="Delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Spinner/>
        )}
        
        <div className={classes.centering}>
          <Button className={classes.button} onClick={() => {window.history.back()}} >Back</Button>
        </div>
        <Link to="/settings/accounts/add" className={classes.link} >
          <Fab variant="extended" size="large" color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
            Add User
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

