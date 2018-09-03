import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToPortfolio, removeToPortfolio, setMessageSaw, sendPortfolioToApi } from '../actions/a_user'
import { selectProduct } from '../actions/a_products'
import './../sass/home.scss'

import Modal from '@material-ui/core/Modal';
import ConnectionStatus from './../components/connection_status';
import MenuAppBar from './../components/menu_app_bar';
import TabContainer from './../components/tabs_app';
import CardsProducts from './../components/cards_products'
import Footer from './../components/footer';
import Details from './../components/details';
import WelcomeModal from './../components/welcome';
import NewsModal from './../components/news_modal';
import ConfirmModal from './../components/confirm_modal';


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = {
    paper: {
        position: 'absolute',
        width: 600,
        height: 400,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
};


// var msisdn_received = null;

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalToggle: true,
            typeContent: 2, //0 = modal inicial, 1 = detalhes, 2 = modal de News, 3= Confirm Modal
            modalDetails: false,
            modalData: [],
            ready: true,
            messages: 'Iniciando',
            errors: null,
        };
    }

    componentDidMount() {
        if (this.props.products.length === 0 ||
            this.props.sva_produtos_id.length === 0 ||
            this.props.user_products.length === 0 ) {
                setTimeout(() => { this.props.history.push('/login') }, 100);
        }
    }

    renderNextDateAvailable() {
        let nextDate_month = new Date().getMonth() + 2;
        let nextDate_year = "/" + new Date().getFullYear();
        if (nextDate_month < 10) {
            nextDate_month = "0" + nextDate_month;
        }
        let nextDate_day = "01/";
        let nextDate_full = nextDate_day + nextDate_month + nextDate_year;
        return (
            nextDate_full
        )
    }

    getCurrentPoints() {
        let current_points = 0;
        this.props.user_products.forEach(element => {
            current_points += element.pontos;
        });
        return current_points;
    }

    getRemainPoints() {
        return this.props.user_total_points-this.getCurrentPoints();
    }

    handleClose = () => {
        if (this.props.product_selected !== null) {
            this.props.selectProduct(null);
        }
        if (this.props.user_message_history > 0) {
            this.props.setMessageSaw(null);
        }
    };

    handleSwitch = (checked, value) => {
        if (checked) {
            this.props.addToPortfolio(value);
        }
        else {
            this.props.removeToPortfolio(value);
        }
    }

    renderSwitch(param) {
        switch(param) {
            case 0:
                return <WelcomeModal
                            handleClose={this.handleClose} />;
            case 1:
                return <Details
                            details={this.props.product_selected}
                            handleSwitch={this.handleSwitch} /> ;
            case 2:
                return <NewsModal
                            handleClose={()=>{
                                this.props.sendPortfolioToApi()
                            }}/>;
            case 3:
                return <ConfirmModal
                            userProducts={this.props.user_products}
                            handleClose={this.handleClose}
                            remainPoints={this.getRemainPoints()}
                            currentPoints={this.getCurrentPoints()}
                            renderNextDateAvailable={this.renderNextDateAvailable()}
                            onSubmit={()=>{
                                this.props.sendPortfolioToApi().then(()=>{
                                    this.handleClose();
                                });
                            }} />;
            default:
                return <WelcomeModal handleClose={this.handleClose}/>;
         }
      }

    render() {
        if (!this.state.ready) {
            return (
                <ConnectionStatus colors={{ main: '#f26522' }} status={this.state.ready} error={this.state.errors} messages={this.state.messages} />
            )
        }
        else {
            let isContentDetailToOpen = false;
            let typeContent = 0;
            // verifica se é para abrir modal detalhes
            if (this.props.product_selected !== null) {
                isContentDetailToOpen = true;
                typeContent = 1;
            } else if (this.props.user_message_history > 0) {
                isContentDetailToOpen = true;
                typeContent = this.props.user_message_history;
            }
            return (
                <div>
                    <Modal
                        onClose={this.handleClose}
                        // open={this.state.modalToggle}
                        open={isContentDetailToOpen}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                            {this.renderSwitch(typeContent)}
                    </Modal> 

                    <div className='masterContainer'>
                        <div className='barContainer'><MenuAppBar title="PERSONALIZE SEUS SERVIÇOS" /></div>
                        <div className='tabContainer'><TabContainer /></div>
                        <div className='cardsConteiner'><CardsProducts /></div>
                        <div className='footerContainer'>
                            <Footer
                                renderNextDateAvailable={this.renderNextDateAvailable()}
                                currentPoints={this.getCurrentPoints()} />
                        </div>
                    </div>

                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    sva_produtos_id: state.user.sva_produtos_id,
    products: state.products.list,
    product_selected: state.products.product_selected,
    user_products: state.user.user_products,
    user_message_history: state.user.user_message_history,
    user_total_points: state.user.pontos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addToPortfolio,
    removeToPortfolio,
    selectProduct,
    setMessageSaw,
    sendPortfolioToApi,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)