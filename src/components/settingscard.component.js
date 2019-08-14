import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import LaunchIcon from '@material-ui/icons/Launch';
import PrintIcon from '@material-ui/icons/Print';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  cardActionArea: {
    width: 300,
    height: 180,
    [theme.breakpoints.down('xs')]: {
      width: '90vw'
    },
  },
  pos: {
    marginBottom: 0,
    marginTop: 0
  },
}));

function SelectIcon(props) {
  if (props.action === 'accounts') {
    return (<SupervisorAccountIcon color="primary" style={{ fontSize: 60 }} />);
  } else if (props.action === 'settings') {
    return (<SettingsIcon color="primary" style={{ fontSize: 60 }} />);
  } else if (props.action === 'connection') {
    return (<SignalCellularAltIcon color="primary" style={{ fontSize: 60 }} />);
  } else if (props.action === 'info') {
    return (<InfoIcon color="primary" style={{ fontSize: 60 }} />);
  } else if (props.action === 'printer') {
    return (<PrintIcon color="primary" style={{ fontSize: 60 }} />);
  } else {
    return (<LaunchIcon color="primary" style={{ fontSize: 60 }} />);
  }
}

export default function SettingsCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.cardActionArea}>
        <CardContent>
          <Typography className={classes.pos} variant="h1" component="h1" align="center">
            <SelectIcon action={props.action} />
          </Typography>
          <Typography className={classes.pos} variant="h6" component="h6" align="center">
            { props.title }
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}