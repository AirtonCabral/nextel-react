import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { setProductsToShow } from './../actions/a_products'
import Menu from '@material-ui/core/Menu';

import Regulamento from './regulamento'
import ComoFunciona from './comofunciona';
import Ajuda from './ajuda';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

export class TabContainer extends React.Component {

  constructor(props) {
    super(props)

    // creating tabs categories
    let output_tabs = []
    let sort_tabs = []
    output_tabs.push('todos') // adiciona aba
    this.props.products.map((v, i) => {
      let hasItem = false;
      sort_tabs.map((_v, _i) => {
        if (_v === v.tags) {
          hasItem = true;
        }
      });
      if (!hasItem) {
        sort_tabs.push(v.tags)
      }
    });
    sort_tabs.sort();
    output_tabs.push(...sort_tabs);
    // console.log(output_tabs);

    this.state = {
      tabSelected: this.props.tabSelected,
      titleTabs: output_tabs,
      anchorEl: null,
      openRegulamento: false,
      openComoFunciona: false,
      openAjuda: false,
    };
  }

  handleChange = (event, value) => {
    // console.log('>>>>> handleChange', value);
    this.props.setProductsToShow(value, this.state.titleTabs[value]);
    this.setState({
      tabSelected: value, // não confundir com 'props.tabSelected'
    });
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

  renderMenuDrop() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return(<Menu
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
      {/* <MenuItem onClick={this.props.handleReload}>{'Reload (debug-mode)'}</MenuItem> */}
      {/* <MenuItem onClick={this.props.handleLogout}>{'Logout'}</MenuItem> */}
    </Menu>)
  }

  render() {
    return (
      <div style={styles.root}>

        <AppBar position="sticky" color="default">
        
          <Tabs
            value={this.state.tabSelected}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            className='tabs'>
            {this.state.titleTabs.map((item, i) => {
              return <Tab key={i} label={item} />
            })}
          </Tabs>
        
          <div style={{position:'absolute'}}>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            { this.renderMenuDrop() }
          </div>

        </AppBar>
        
        <Regulamento handleClose={this.handleCloseRegulamento} onOpen={this.state.openRegulamento} />
        <ComoFunciona handleClose={this.handleCloseComoFunciona} onOpen={this.state.openComoFunciona} />
        <Ajuda handleClose={this.handleCloseAjuda} onOpen={this.state.openAjuda} />

      </div>
    );
  }
}

TabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  products: state.products.list,
  tabSelected: state.products.tab_selected_index,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  setProductsToShow
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(TabContainer))

