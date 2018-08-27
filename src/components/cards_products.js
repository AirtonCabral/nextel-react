import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'
import CirProgress from '@material-ui/core/CircularProgress';

export class CardsProducts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cardToShow: []
        }
    }

    componentDidMount() {
        
    }

    handleChange = (event, value) => {
        this.handleCards(value);
    }

    handleCards(value) {
        console.log('handleCards');
        // let cardsTemp = [];
        // this.props.products.map((v, i) => {
        // });
        // this.setState({
        //   tabSelected: value,=
        //   cardToShow: [...cardsTemp]
        // });
    }

    render() {
        if (this.props.products.length === 0) {
            return(
                <div className="cardLoaderContainer">
                    <CirProgress size={18} thickness={5} color={'primary'} />
                </div>
            );
        }
        else {
            let cardToShow = []
            this.props.products.map((item, i) => {
                if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                    cardToShow.push(
                        <div key={`key-${i}`} className="cardItem">
                            <DefaultCard
                                userProducts={this.props.svaProdutosID}
                                data={item}
                                handleSwitch={()=>{
                                    console.log('handle switch');
                                }}
                                openDetails={()=>{
                                    console.log('open details');
                                }} />
                        </div>
                    );
                }
            });
            return (
                <div className="cardContainer">
                    <AliceCarousel
                        infinite={true}
                        items={cardToShow}
                        startIndex={this.props.tabSelected}
                        mouseDragEnabled={true}
                        buttonsDisabled={true}
                        responsive={{ // valores representam "acima de:"
                            0: { items: 1 },
                            570: { items: 2 },
                            950: { items: 3 },
                            1400: { items: 4 },
                        }}
                    />
                </div>
            );
        };
    }
}

const mapStateToProps = state => ({
  products: state.portfolio.products,
  tabSelected: state.portfolio.tab_selected_index,
  tabTitle: state.portfolio.tab_selected_title,
  svaProdutosID: state.user.svaProdutosID,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // actions
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsProducts)