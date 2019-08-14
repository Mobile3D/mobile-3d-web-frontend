import React, { useState, useContext, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import Logo from '../images/icon-white.svg';
import { userService } from '../services/users.service';
import { UserContext } from '../contexts/user.context';
import { checkResponse } from '../helpers/api.helper';
import Snackbar from '../components/snackbar.component';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(images/login-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: 60,
    height: 60,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
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

    if (!checkTxtUsername(txtUsername)) {
      valid = false;
    }
    if (!checkTxtPassword(txtPassword)) {
      valid = false;
    }
    
    if (valid) {
      
      userService.login({
        username: txtUsername,
        password: txtPassword
      }).then((data) => {

        const responseCheck = checkResponse(data);
        
        if (responseCheck.valid) {
          window.localStorage.setItem('token', data.token);
          window.location.reload();
        } else {
          setSnackbarMessage({
            type: responseCheck.type,
            message: responseCheck.message
          });
          snackbar.current.handleOpen();
        }

      });

    }
  }

  function checkTxtUsername(username) {
    if (validator.isEmpty(username)) {
      setTxtUsernameError({
        error: true,
        message: 'Please enter your username.'
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
        message: 'Please enter your password.'
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

  // loading
  if (user.authorized === undefined) {
    return (<div></div>);
  } else if (user.authorized) {
    return (<Redirect exact to="/" />);
  } else {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={7} lg={8} className={classes.image} />
        <Grid item xs={12} sm={7} md={5} lg={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={Logo} alt="Logo" width={27} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="txtUsername"
                label="Username"
                name="txtUsername"
                autoComplete="username"
                autoFocus
                onChange={handleTxtUsernameChange}
                value={txtUsername}
                error={txtUsernameError.error}
                helperText={txtUsernameError.message}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="txtPassword"
                label="Password"
                type="password"
                id="txtPassword"
                autoComplete="current-password"
                onChange={handleTxtPasswordChange}
                value={txtPassword}
                error={txtPasswordError.error}
                helperText={txtPasswordError.message}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              { /*}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              */}
            </form>
          </div>
        </Grid>
        <Snackbar 
          message={snackbarMessage.message} 
          variant={snackbarMessage.type}
          ref={snackbar} 
        />
      </Grid>
    );
  }
}