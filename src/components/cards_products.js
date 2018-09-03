import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'
import CirProgress from '@material-ui/core/CircularProgress';

export class CardsProducts extends React.Component {

    render() {
        if (this.props.products.length === 0) {
            return(
                <div className="cardLoaderContainer">
                    <CirProgress size={18} thickness={5} color={'primary'} />
                </div>
            );
        }
        else {
            let cardToShow = [];
            // montando os cards gerais dos produtos
            this.props.products.map((item, i) => {
                if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                    cardToShow.push(
                        <div key={i} className="cardItem">
                            <DefaultCard id={i} openDetails={this.props.openDetails}/>
                        </div>
                    );
                }
            });
            return (
                <div className="cardContainer">
                    <AliceCarousel
                        mouseDragEnabled
                        infinite
                        keysControlDisabled
                        items={cardToShow}
                        startIndex={this.props.tabSelected}
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
    products:           state.products.list,
    tabSelected:        state.products.tab_selected_index,
    tabTitle:           state.products.tab_selected_title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsProducts)