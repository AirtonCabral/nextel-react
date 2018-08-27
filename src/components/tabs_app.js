import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setProductsToShow } from './../actions/a_portfolio'


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
}

export class TabContainer extends React.Component {

  constructor(props) {
    super(props)

    // creating tabs categories
    let output_tabs = []
    this.props.products.map((v, i) => {
      let hasItem = false;
      output_tabs.map((_v, _i) => {
        if (_v === v.tags) {
          hasItem = true
        }
      });
      if (!hasItem) {
        output_tabs.push(v.tags)
      }
    });
    output_tabs.push('todos') // adiciona aba
    output_tabs.sort((a, b) => a.tags > b.tags);

    this.state = {
      tabSelected: this.props.tabSelected,
      titleTabs: output_tabs
    };
  }

  handleChange = (event, value) => {
    this.props.setProductsToShow(value, this.state.titleTabs[value]);
    this.setState({
      tabSelected: value, // não confundir com 'props.tabSelected'
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={this.state.tabSelected}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            // indicatorColor="primary"
            // textColor="primary"
            className='tabs'>
            {this.state.titleTabs.map((item, i) => {
              return <Tab key={i} label={item} />
            })}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.portfolio.products,
  tabSelected: state.portfolio.tab_selected_index,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  setProductsToShow
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TabContainer)
