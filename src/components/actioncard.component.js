import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderIcon from '@material-ui/icons/Folder';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardActionArea: {
    width: 400,
    height: 250,
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
  if (props.action === 'print') {
    return (<PrintIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'home') {
    return (<HomeIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'upload') {
    return (<CloudUploadIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'files') {
    return (<FolderIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'control') {
    return (<ControlCameraIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'logout') {
    return (<PowerSettingsNewIcon color="primary" style={{ fontSize: 80 }} />);
  } else if (props.action === 'settings') {
    return (<SettingsIcon color="primary" style={{ fontSize: 80 }} />);
  } else {
    return (<LaunchIcon color="primary" style={{ fontSize: 80 }} />);
  }
}

export default function ActionCard(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.cardActionArea}>
        <CardContent>
          <Typography className={classes.pos} variant="h1" component="h1" align="center">
            <SelectIcon action={props.action} />
          </Typography>
          <Typography className={classes.pos} variant="h5" component="h5" align="center">
            { props.title }
          </Typography>
          <Typography className={classes.pos} variant="subtitle1" component="h6" color="textSecondary" align="center">
            { props.description }
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}