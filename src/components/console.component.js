import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: 800,
    [theme.breakpoints.down('xs')]: {
      width: '90vw'
    },
    flexGrow: 1,
    margin: 0,
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      padding: '15.5px 14px',
    },
  },
  logBox: {
    height: 300,
    marginBottom: '16px',
    borderRadius: 5,
    background: '#e0e0e0',
    fontFamily: 'Consolas',
    padding: '10px',
    color: '#000000',
    textAlign: 'left',
    overflowY: 'scroll',
  },
}));

export default function Console(props) {
  const classes = useStyles();

  const [txtCommand, setTxtCommand] = useState('');
  const [logCount, setLogCount] = useState(0);
  const [log, setLog] = useState([]);

  props.socket.on('printLog', (e) => {
    if (log[log.length - 1] !== e) {
      if (log.length > 20) log.shift();
      setLogCount(logCount + 1);
      setLog([...log, e]);
    }
  });

  props.socket.on('printStatus', (e) => {
    if (log[log.length - 1] !== e) {
      if (log.length > 20) log.shift();
      setLogCount(logCount + 1);
      setLog([...log, e]);
    }
  });

  const handleTxtCommandChange = (e) => {
    setTxtCommand(e.target.value);
  }

  const handleBtnSendClick = (e) => {
    if (txtCommand !== '') {
      props.socket.emit('sendManualCommand', txtCommand);
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.logBox}>
              { log.map(text => (
                <span key={logCount}>{text}<br/></span>
              ))}
            </div>
            <Grid container spacing={1} justify="center">
              <Grid item sm={10} className={classes.gridItem}>
                <TextField
                  id="command"
                  className={classes.textField}
                  label="Command"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={handleTxtCommandChange}
                  value={txtCommand}
                />
              </Grid>  
              <Grid item sm={2} className={classes.gridItem}>
                <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={handleBtnSendClick}>Send</Button>
              </Grid>            
            </Grid>            
          </CardContent>
        </div>
      </Card>
    </div>
  )
}