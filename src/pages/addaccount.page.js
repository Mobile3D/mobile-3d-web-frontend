import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';

import Dashboard from '../components/dashboard.component';
import Snackbar from '../components/snackbar.component';
import { userService } from '../services/users.service';

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
  const [txtFirstnameError, setTxtFirstnameError] = useState({
    error: false,
    message: ''
  });
  const [txtLastnameError, setTxtLastnameError] = useState({
    error: false,
    message: ''
  });
  const [txtUsernameError, setTxtUsernameError] = useState({
    error: false,
    message: ''
  });
  const [txtPasswordError, setTxtPasswordError] = useState({
    error: false,
    message: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState({
    type: 'info',
    message: ''
  });

  const snackbar = useRef();

  function handleTxtFirstnameChange(e) {
    setTxtFirstname(e.target.value);
    checkTxtFirstname(e.target.value);
  }

  function handleTxtLastnameChange(e) {
    setTxtLastname(e.target.value);
    checkTxtLastname(e.target.value);
  }

  function handleTxtUsernameChange(e) {
    setTxtUsername(e.target.value);
    checkTxtUsername(e.target.value);
  }

  function handleTxtPasswordChange(e) {
    setTxtPassword(e.target.value);
    checkTxtPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    if (!checkTxtFirstname(txtFirstname)) {
      valid = false;
    }
    if (!checkTxtLastname(txtLastname)) {
      valid = false;
    }
    if (!checkTxtUsername(txtUsername)) {
      valid = false;
    }
    if (!checkTxtPassword(txtPassword)) {
      valid = false;
    }
    
    if (valid) {
      userService.add({
        firstname: txtFirstname,
        lastname: txtLastname,
        username: txtUsername,
        password: txtPassword,
        admin: true
      }).then((data) => {
        if (checkResponse(data)) {
          console.log('okay');
        }
      });
    }
  }

  function checkTxtFirstname(firstname) {
    if (validator.isEmpty(firstname)) {
      setTxtFirstnameError({
        error: true,
        message: 'Please enter a firstname.'
      });
      return false;
    } else {
      resetTxtFirstnameError();
      return true;
    }
  }

  function resetTxtFirstnameError() {
    setTxtFirstnameError({
      error: false,
      message: ''
    });
  }

  function checkTxtLastname(lastname) {
    if (validator.isEmpty(lastname)) {
      setTxtLastnameError({
        error: true,
        message: 'Please enter a lastname.'
      });
      return false;
    } else {
      resetTxtLastnameError();
      return true;
    }
  }

  function resetTxtLastnameError() {
    setTxtLastnameError({
      error: false,
      message: ''
    });
  }

  function checkTxtUsername(username) {
    if (validator.isEmpty(username)) {
      setTxtUsernameError({
        error: true,
        message: 'Please enter a username.'
      });
      return false;
    } else {
      resetTxtUsernameError();
      return true;
    }
  }

  function resetTxtUsernameError() {
    setTxtUsernameError({
      error: false,
      message: ''
    });
  }

  function checkTxtPassword(password) {
    if (validator.isEmpty(password)) {
      setTxtPasswordError({
        error: true,
        message: 'Please enter a password.'
      });
      return false;
    } else {
      resetTxtPasswordError();
      return true;
    }
  }

  function resetTxtPasswordError() {
    setTxtPasswordError({
      error: false,
      message: ''
    });
  }

  function checkResponse(data) {
    if (data.error === undefined) return true;
    else {
      if (data.error.code === 'ER_USERNAME_TAKEN') {
        setSnackbarMessage({
          type: 'error',
          message: 'The username you entered is already taken.'
        });
      } else if (data.error.code === 'ER_INTERNAL') {
        setSnackbarMessage({
          type: 'error',
          message: 'An internal error occured. Please try again in a few seconds.'
        });
      } else if (data.error.code === 'ER_MISSING_PARAMS') {
        setSnackbarMessage({
          type: 'error',
          message: 'Some parameters are missing.'
        });
      } else {
        setSnackbarMessage({
          type: 'error',
          message: 'An unknown error occured.'
        });
      }

      snackbar.current.handleOpen();
      return false;
    }
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
                error={txtFirstnameError.error}
                helperText={txtFirstnameError.message}

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
                error={txtLastnameError.error}
                helperText={txtLastnameError.message}

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
                error={txtUsernameError.error}
                helperText={txtUsernameError.message}

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
                error={txtPasswordError.error}
                helperText={txtPasswordError.message}

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
      <Snackbar 
        message={snackbarMessage.message} 
        variant={snackbarMessage.type}
        ref={snackbar} 
      />
    </Dashboard>
  );
}