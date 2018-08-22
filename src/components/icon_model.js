import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  icon: {
    // margin: theme.spacing.unit * 2,
  },
  iconHover: {
    // margin: theme.spacing.unit * 2,
    '&:hover': {
      color: '#FF3333',
    },
  },
});

function Home(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function Checked(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </SvgIcon>
  );
}

function Drawer(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
  );
}

function Help(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </SvgIcon>
  );
}

function SvgIcons(props) {
  const { classes } = props;
  let size = 'size' in props ? props.size : 30
  let name = 'name' in props ? props.name : 'home'
  let color = 'color' in props ? props.color : 'disabled'
  return (
    <div className={classes.root}>
      {name==='home' && <Home className={classes.iconHover} color={color} style={{ fontSize: size }} />}
      {name==='checked' && <Checked className={classes.iconHover} color={color} style={{ fontSize: size }} />}
      {name==='drawer' && <Drawer className={classes.iconHover} color={color} style={{ fontSize: size }} />}
      {name==='help' && <Help className={classes.iconHover} color={color} style={{ fontSize: size }} />}
    </div>
  );
}

SvgIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgIcons);