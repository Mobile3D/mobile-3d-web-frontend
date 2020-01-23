import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { subscribeToEvent, emitEvent, unsubscribeFromEvent } from '../services/socket.service';

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
  const [log, setLog] = useState([]);

  const logBox = useRef();


  useEffect(() => {
    subscribeToEvent('printConsoleLog', (consoleLog) => {

      const consoleLogWithId = [];

      for(let i = 0; i < consoleLog.length; i++) {
        consoleLogWithId.push({id: i, text: consoleLog[i]});
      }

      setLog(consoleLogWithId);
      logBox.current.scrollTop = logBox.current.scrollHeight;
    });

    return () => {
      unsubscribeFromEvent('printConsoleLog');
    }

  }, []);

  const handleTxtCommandChange = (e) => {
    setTxtCommand(e.target.value);
  }


  const handleBtnSendClick = (e) => {
    if (txtCommand !== '') {
      emitEvent('sendManualCommand', txtCommand);
    }
  }

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter' && txtCommand !== '') {
      emitEvent('sendManualCommand', txtCommand);
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.logBox} ref={logBox}>
              { log.map(cLog => (
                <span key={cLog.id}>{cLog.text}<br/></span>
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
                  onKeyDown={handleEnterKeyDown}
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