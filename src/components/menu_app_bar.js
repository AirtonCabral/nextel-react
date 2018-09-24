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
// import Help from '@material-ui/icons/Help';
// import IconSvg from './icon_model'
import Regulamento from './regulamento'
import ComoFunciona from './comofunciona';
import Ajuda from './ajuda';

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
    openComoFunciona: false,
    openAjuda: false,
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

  handleCloseComoFunciona = () => {
    this.setState({ openComoFunciona: false });
  };

  handleCloseAjuda = () => {
    this.setState({ openAjuda: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color={'default'}>
          <Toolbar className='headerBar'>

            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit">
                <MenuIcon />
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
                className={classes.iconRight}>
                <MenuItem onClick={() => {
                  this.setState({ openComoFunciona: true });
                  this.handleClose();
                }}>{'Como Funciona'}</MenuItem>
                <MenuItem onClick={() => {
                  this.setState({ openRegulamento: true });
                  this.handleClose();
                }}>{'Regulamento'}</MenuItem>
                <MenuItem onClick={() => {
                  this.setState({ openAjuda: true });
                  this.handleClose();
                }}>{'Ajuda'}</MenuItem>
                <MenuItem onClick={this.props.handleReload}>{'Reload (debug-mode)'}</MenuItem>
                {/* <MenuItem onClick={this.props.handleLogout}>{'Logout'}</MenuItem> */}
              </Menu>
            </div>

            <Typography variant="subheading" color="inherit" className={classes.flex}>
              {'title' in this.props ? this.props.title : 'Title here'}
            </Typography>

          </Toolbar>
        </AppBar>
        <Regulamento handleClose={this.handleCloseRegulamento} onOpen={this.state.openRegulamento} />
        <ComoFunciona handleClose={this.handleCloseComoFunciona} onOpen={this.state.openComoFunciona} />
        <Ajuda handleClose={this.handleCloseAjuda} onOpen={this.state.openAjuda} />
      </div>
    );
  }

}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
