import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import Help from '@material-ui/icons/Help';
// import IconSvg from './icon_model'
import Regulamento from './regulamento'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};


class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    openRegulamento: false,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseRegulamento = () => {
    this.setState({ openRegulamento: false });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color={'default'}>
          <Toolbar className='headerBar'>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="subheading" color="inherit" className={classes.flex}>
              {'title' in this.props ? this.props.title : 'Title here'}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Help />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                  className={classes.iconRight}
                >
                  <MenuItem onClick={this.handleClose}>{'Como Funciona'}</MenuItem>
                  <MenuItem onClick={() => {
                    this.setState({ openRegulamento: true });
                    this.handleClose();
                  }}>{'Regulamento'}</MenuItem>
                  <MenuItem onClick={this.handleClose}>{'Ajuda'}</MenuItem>
                  <MenuItem onClick={this.props.handleLogout}>{'Logout'}</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Regulamento handleCloseRegulamento={this.handleCloseRegulamento} openRegulamento={this.state.openRegulamento} />
      </div>
    );
  }

}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
