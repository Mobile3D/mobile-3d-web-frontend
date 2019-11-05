import React, { useState, useEffect, useRef, useContext } from 'react';
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
import DeleteDialog from '../components/deletedialog.component';
import { userService } from '../services/users.service';
import { AccountsContext } from '../contexts/accounts.context';
import { checkResponse } from '../helpers/api.helper';

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
  const accountsContext = useContext(AccountsContext);

  const [accounts, setAccounts] = useState([]);
  const [userPromiseResolved, setUserPromiseResolved] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });
  const [deleteItemName, setDeleteItemName] = useState('');
  const [deleteItemId, setDeleteItemId] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [update, setUpdate] = useState(false);

  const snackbar = useRef();

  useEffect(() => {
    userService.getAll().then((data) => {

      const responseCheck = checkResponse(data);

      if (responseCheck.valid) {
        setAccounts(data);
        
        if (accountsContext.new) {
          setSnackbarMessage({
            type: 'success',
            message: 'User "' + accountsContext.username + '" successfully added.'
          });
          accountsContext.new = false;
          accountsContext.username = '';
          snackbar.current.handleOpen();
        }

      } else {
        setSnackbarMessage({
          type: responseCheck.type,
          message: responseCheck.message
        });
        snackbar.current.handleOpen();
      }
      setUserPromiseResolved(true);
      setUpdate(false);
    });
  }, [accountsContext.new, accountsContext.username, update]);

  const handleDeleteClick = (row) => {
    setDeleteItemId(row._id);
    setDeleteItemName(row.username);
    setOpenDeleteDialog(true);
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  }

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);

    userService.remove(deleteItemId).then((data) => {

      const responseCheck = checkResponse(data);

      if (responseCheck.valid) {
        setUpdate(true);
      } else {
        setSnackbarMessage({
          type: responseCheck.type,
          message: responseCheck.message
        });
        snackbar.current.handleOpen();
      }

    });

  }

  return (
    <Dashboard navTitle="Account Settings" backTo="settings">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Account Settings
        </Typography>
      </div>
      <div className={classes.tableRoot}>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
          Accounts
        </Typography>
        { userPromiseResolved && accounts.length > 0 ? (
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
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <Hidden xsDown={true}>
                      <TableCell>{row.firstname}</TableCell>
                      <TableCell>{row.lastname}</TableCell>
                    </Hidden>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteClick(row)} aria-label="Delete">
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

      <DeleteDialog 
        open={openDeleteDialog} 
        deleteItemName={deleteItemName}
        deleteType="user"
        onCancelDelete={handleDeleteCancel} 
        onConfirmDelete={handleDeleteConfirm} 
      />

      <Snackbar 
        message={snackbarMessage.message} 
        variant={snackbarMessage.type}
        ref={snackbar} 
      />

    </Dashboard>
  );
}

