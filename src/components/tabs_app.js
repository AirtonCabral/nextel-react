import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setProductsToShow } from './../actions/a_products'


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
      titleTabs: output_tabs
    };
  }

  handleChange = (event, value) => {
    // console.log('>>>>> handleChange', value);
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
  products: state.products.list,
  tabSelected: state.products.tab_selected_index,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  setProductsToShow
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TabContainer)
