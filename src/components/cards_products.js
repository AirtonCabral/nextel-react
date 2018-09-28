import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'
import CirProgress from '@material-ui/core/CircularProgress';
import AlertDialog from './alert';
// import { selectProduct } from './../actions/a_products'

const missingUserPointsMessage = "Pontos insuficientes"

export class CardsProducts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: false,
            alertData: '',
        }
        this.handleAlertDialog = this.handleAlertDialog.bind(this);
        this.renderSwitchButtonClickCallback = this.renderSwitchButtonClickCallback.bind(this);
    }

    renderNextDateAvailable() {
        let nextDate_month = new Date().getMonth() + 2;
        const nextDate_year = "/" + new Date().getFullYear();
        if (nextDate_month < 10) {
            nextDate_month = "0" + nextDate_month;
        }
        const nextDate_day = "01/";
        const nextDate_full = nextDate_day + nextDate_month + nextDate_year;
        const output = "Altere a partir de " + nextDate_full;
        return output;
    }

    renderSwitchButtonClickCallback(name, isSelected) {
        // console.log('name', name);
        const alerMessage =  isSelected ? this.renderNextDateAvailable() : missingUserPointsMessage;
        this.setState({
            alert:true,
            alertData: {
                title: name,
                content: alerMessage,
            }
        });
    }

    handleAlertDialog() {
        this.setState({
            alert:false,
            // alertData: alerMessage
        });
    }

    render() {
        let classNameDynamic = "cardItem";
        if (this.props.products.length === 0) {
            return(
                <div className="cardLoaderContainer">
                    <CirProgress size={18} thickness={5} color={'primary'} />
                </div>
            );
        }
        else {
            let cardToShow = [];
            let totalItensToShow = 0;
            let isSmall = false;
            // hack pra resolver a questão da largura dos cards
            this.props.products.map((item, i) => {
                if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                    totalItensToShow++;
                }
            });
            if (totalItensToShow <= 2) {
                classNameDynamic = "cardItem-reduzido";
                isSmall = true;
            }
            // montando os cards gerais dos produtos
            this.props.products.map((item, i) => {
                if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                    cardToShow.push(
                        <div key={i} className={classNameDynamic}>
                            <DefaultCard
                                nextDateAvailable={this.renderNextDateAvailable()}
                                missingUserPointsMessage={missingUserPointsMessage}
                                switchButtonClickCallback={this.renderSwitchButtonClickCallback}
                                isSmall={isSmall}
                                id={i} />
                        </div>
                    );
                }
            });
            return (
                <div className="cardContainer">
                    <AlertDialog
                        data={this.state.alertData}
                        onOpen={this.state.alert}
                        handleClose={this.handleAlertDialog} />
                    <AliceCarousel
                        infinite
                        mouseDragEnabled
                        keysControlDisabled
                        items={cardToShow}
                        dotsDisabled={true}
                        // autoPlayInterval={4000}
                        startIndex={this.props.tabSelected}
                        responsive={{ // valores representam "acima de:"
                            0: { items: 1 },
                            620: { items: 2 },
                            // 999: { items: 3 },
                            // 1400: { items: 4 },
                            // 0: { items: 1, buttonsDisabled: false },
                            // 720: { items: 3, buttonsDisabled: true },
                        }}
                    />
                </div>
            );
        };
    };

}

const mapStateToProps = state => ({
    products:           state.products.list,
    tabSelected:        state.products.tab_selected_index,
    tabTitle:           state.products.tab_selected_title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // selectProduct
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsProducts)