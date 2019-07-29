import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dashboard from '../components/dashboard.component';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(12),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1/4),
    marginRight: theme.spacing(1/4),
    marginBottom: 0,
    marginTop: 0
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  icon: {
    fontSize: 35,
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  centering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function AddAccount() {
  const classes = useStyles();

  const [txtFirstname, setTxtFirstname] = useState('');
  const [txtLastname, setTxtLastname] = useState('');
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  function handleTxtFirstnameChange(e) {
    setTxtFirstname(e.target.value);
  }

  function handleTxtLastnameChange(e) {
    setTxtLastname(e.target.value);
  }

  function handleTxtUsernameChange(e) {
    setTxtUsername(e.target.value);
  }

  function handleTxtPasswordChange(e) {
    setTxtPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Dashboard navTitle="Account Settings">
      <main className={classes.main}>
        <CssBaseline />
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
          Add Account
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtFirstname"
                autoComplete="firstname"
                margin="normal"
                label="Firstname"
                variant="outlined" 
                value={txtFirstname}
                onChange={handleTxtFirstnameChange}

              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtLastname"
                autoComplete="Lastname"
                margin="normal"
                label="Lastname"
                variant="outlined" 
                value={txtLastname}
                onChange={handleTxtLastnameChange}

              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="text"
                name="txtUsername"
                autoComplete="username"
                margin="normal"
                label="Username"
                variant="outlined" 
                value={txtUsername}
                onChange={handleTxtUsernameChange}

              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField  
                className={classes.textField}
                type="password"
                name="txtPassword"
                autoComplete="password"
                margin="normal"
                label="Password"
                variant="outlined" 
                value={txtPassword}
                onChange={handleTxtPasswordChange}

              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={false}
            >
              {'Save'/*this.state.loading ? 'Bitte warten...' : 'Speichern'*/}
            </Button>
          </form>
          </Paper>
          <div className={classes.centering}>
            <Button className={classes.button} onClick={() => {window.history.back()}} >Back</Button>
          </div>
      </main>
    </Dashboard>
  );
}