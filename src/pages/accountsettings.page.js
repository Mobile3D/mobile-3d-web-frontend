import React, { useState } from 'react';
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

import Dashboard from '../components/dashboard.component';
import { Hidden } from '@material-ui/core';

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

  const [accounts, setAccounts] = useState([
    {
      _id: 1,
      username: 'testuser',
      firstname: 'Test',
      lastname: 'User',
      admin: true
    },
    {
      _id: 2,
      username: 'testuser2',
      firstname: 'Test',
      lastname: 'User 2',
      admin: true
    },
  ]);

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
        <div className={classes.centering}>
          <Button className={classes.button} onClick={() => {window.history.back()}} >Back</Button>
        </div>
        <Link to="/settings/accounts/add" className={classes.link} >
          <Fab size="large" color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </Dashboard>
  );
}

