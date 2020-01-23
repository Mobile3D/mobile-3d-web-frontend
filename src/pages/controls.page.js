import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import Dashboard from '../components/dashboard.component';
import Status from '../components/status.component';
import AxisControls from '../components/axiscontrols.component';
import ControlSettings from '../components/controlsettings.component';
import Console from '../components/console.component';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    /* to fix x-scroll with grid */
    margin: 0,
    width: '100%',
  },
  heroContent: {
    marginTop: theme.spacing(8),
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(1)}px`,
  },
  controlWindow: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    textAlign: 'center',
  },
}));

export default function Controls(props) {
  const classes = useStyles();

  const [openAxisControls, setOpenAxisControls] = useState(true);
  const [openControlSettings, setOpenControlSettings] = useState(false);
  const [openConsole, setOpenConsole] = useState(false);

  const handleOpenAxisControl = () => {
    setOpenAxisControls(!openAxisControls);
  }

  const handleOpenControlSettings = () => {
    setOpenControlSettings(!openControlSettings);
  }

  const handleOpenConsole = () => {
    setOpenConsole(!openConsole);
  }

  return (
    <div className={classes.root}>
      <Dashboard navTitle="Controls" backTo="home">
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Controls
          </Typography>
        </div>
        <Grid container className={classes.root} spacing={4}>
          <Grid item xs={12}>
            <Grid container className={classes.options} justify="center" spacing={4}>
              <Grid item>
                <Status printer={props.printer} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <List>
          <Divider/>
          <ListItem button className={classes.listItem} onClick={handleOpenConsole}>
            <ListItemText primary="Console" secondary="Watch the log and send manual commands" />
            {openConsole ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openConsole} timeout="auto">
            <div className={classes.controlWindow}>
              <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12}>
                  <Grid container className={classes.options} justify="center" spacing={4}>
                    <Grid item>
                      <Console />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Collapse>
          <Divider/>
          <ListItem button className={classes.listItem} onClick={handleOpenControlSettings}>
            <ListItemText primary="Control Settings" secondary="Set the fan speed, the temperature and extrude or retract" />
            {openControlSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openControlSettings} timeout="auto" unmountOnExit>
            <div className={classes.controlWindow}>
              <ControlSettings />
            </div>
          </Collapse>
          <Divider/>
          <ListItem button className={classes.listItem} onClick={handleOpenAxisControl}>
            <ListItemText primary="Axis Controls" secondary="Move the axis of the printer" />
            {openAxisControls ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAxisControls} timeout="auto" unmountOnExit>
            <div className={classes.controlWindow}>
              <AxisControls />
            </div>
          </Collapse>
          <Divider/>
        </List>

      </Dashboard>
    </div>
  );
}