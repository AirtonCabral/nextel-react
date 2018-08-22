import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TouchCarousel from './touch_carousel';
import Modal from '@material-ui/core/Modal';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    shadows: ["none"]
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, itens } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            className='tabs'
          >
            <Tab label="Entretenimento" />
            <Tab label="Conteúdo de TV" />
            <Tab label="Conexão" />
            <Tab label="Facilidades" />
            <Tab label="Telefonia" />
            <Tab label="Segurança" />
          </Tabs>
        </AppBar>
        {value === 0 && <TouchCarousel itens={itens}
                                        handleSwitch={this.props.handleSwitch}
                                        openDetails={ this.props.openDetails} />}
        {value === 1 && <TabContainer>Conteúdo de TV</TabContainer>}
        {value === 2 && <TabContainer>Conexão</TabContainer>}
        {value === 3 && <TabContainer>Facilidades</TabContainer>}
        {value === 4 && <TabContainer>Telefonia</TabContainer>}
        {value === 5 && <TabContainer>Segurança</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
