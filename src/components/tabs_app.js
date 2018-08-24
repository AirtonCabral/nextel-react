import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TouchCarousel from './touch_carousel';
import Modal from '@material-ui/core/Modal';


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
    this.props.lista_produtos.map((v, i) => {
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
    output_tabs.sort((a, b) => a.tags > b.tags);

    this.state = {
      tabSelected: 0,
      cardToShow: [],
      titleTabs: [...output_tabs]
    };
  }

  componentDidMount() {
    // forcing start first tab index
    this.handleCards(0);
  }

  handleChange = (event, value) => {
    this.handleCards(value);
  };


  handleCards(value) {
    let cardsTemp = [];
    this.props.lista_produtos.map((v, i) => {
      if (v.tags === this.state.titleTabs[value]) {
        cardsTemp.push(v);
      }
    });
    this.setState({
      tabSelected: value,
      cardToShow: [...cardsTemp]
    });
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
            indicatorColor="primary"
            textColor="primary"
            className='tabs'>
            {this.state.titleTabs.map((item, i) => {
              return <Tab key={i} label={item} />
            })}
          </Tabs>
        </AppBar>
        <TouchCarousel
          itens={this.state.cardToShow}
          userProducts={this.props.usuario_produtos_inicialmente}
          handleSwitch={this.props.handleSwitch}
          openDetails={this.props.openDetails} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lista_produtos:                     state.auth.products,
  pontos_totais:                      state.auth.total,
  usuario_produtos_inicialmente:      state.auth.user_products,
  usuario_produtos:                   state.portfolio.selected,
  pontos_utilizados:                  state.portfolio.total,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TabContainer)