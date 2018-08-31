import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startConnection } from '../actions/a_auth'
import { signIn, addToPortfolio, removeToPortfolio } from '../actions/a_user'
import { getProducts } from '../actions/a_portfolio'
import './../sass/home.scss'

import Modal from '@material-ui/core/Modal';

import ConnectionStatus from './../components/connection_status';
import MenuAppBar from './../components/menu_app_bar';
import TabContainer from './../components/tabs_app';
import CardsProducts from './../components/cards_products'
import Footer from './../components/footer';

import WelcomeModal from './../components/welcome';
import Details from './../components/details';
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

var msisdn_received = '5521981981981';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        // let msisdn = null;
        if (props.location.search) {
            let value = props.location.search;
            msisdn_received = value.split('=')[1];
        }

        this.state = {
            //consoleToggle: false,
            modalToggle: true,
            typeContent: 0, //0 = modal inicial, 1 = detalhes, 2 = modal de News, 3= 
            modalData: [],
            ready: false,
            messages: 'Iniciando',
            errors: null,
            // count: 27,
            // limitCount: 70,
            // services: [],
            // bleh:[],
            // msisdn
        };
    }

    componentDidMount() {

        let status_message = '';

        if (msisdn_received) {
            status_message = 'Autenticando...';
        }
        else {
            status_message = 'MSISDN Não encontrado :(';
            this.setState({
                messages: status_message,
                errors: true
            });
            return;
        }

        this.setState({ messages: status_message }, () => {
            this.props.startConnection('drweb', 'c62J3rZovtw', msisdn_received) // >>>>> auth
                .then(() => {
                    if (this.props.token && this.props.msisdn) {
                        this.props.signIn(this.props.token, this.props.msisdn)// >>>>> signin
                            .then(() => {
                                if (this.props.assinantesID) {
                                    this.setState({
                                        messages: 'Carregando Lista de Serviços',
                                    }, () => {
                                        this.props.getProducts(this.props.token)// >>>>> get products
                                            .then(() => {
                                                let message = ''
                                                if (this.props.products.length > 0) {
                                                    message = 'Lista Carregada!'
                                                    // START PORTFOLIO DEFAULT
                                                    this.props.sva_produtos_id.map((v, i) => {
                                                        this.props.products.map((_v, _i) => {
                                                            if (_v.id === v) {
                                                                this.props.addToPortfolio({ ..._v });
                                                            }
                                                        });
                                                    });
                                                    this.setState({ messages: message }, () => {
                                                        // START PROJECT
                                                        setTimeout(() => {
                                                            this.setState({
                                                                ready: true
                                                            });
                                                        }, 1000);
                                                    });
                                                }
                                                else {
                                                    message = 'Erro ao carregar lista de serviços'
                                                    // ERROR
                                                    this.setState({
                                                        messages: message,
                                                        errors: true
                                                    });
                                                }
                                            })
                                    });
                                }
                                else {
                                    this.setState({
                                        messages: 'Erro ao carregar usuário.',
                                        errors: true
                                    });
                                }
                            })
                    }
                    else {
                        this.setState({
                            messages: 'Problemas com autenticação :(',
                            errors: true
                        });
                    }
                })
        });
    }

    handleOpen = () => {
        this.setState({ 
            modalToggle: true,
            typeContent: 0
        });
    };

    handleClose = () => {
        this.setState({ modalToggle: false });
    };

    openDetails = (e, data) => {
        this.setState({
            modalToggle: true,
            modalData: data,
            typeContent: 1
        });
        console.log(this.state.modalData);
    };

    closeDetails = () => {
        this.setState({ modalToggle: false });
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
                return <WelcomeModal handleClose={this.handleClose} />;
            case 1:
                return <Details details={this.state.modalData} handleSwitch={this.handleSwitch} /> ;
            case 2:
                return <NewsModal handleClose={this.handleClose}/> ;
            case 3:
                return <ConfirmModal handleClose={this.handleClose}/> ;
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
            return (
                <div>
                    {/* <Modal
                        open={this.state.modalDetails}
                        onClose={this.closeDetails}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description" >
                        <Details details={this.state.modalData} handleSwitch={this.handleSwitch} />
                    </Modal>*/}
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modalToggle}
                        onClose={this.handleClose}>
                            {this.renderSwitch(this.state.typeContent)}
                    </Modal> 
                    <div className='masterContainer'>
                        <div className='barContainer'><MenuAppBar title="PERSONALIZE SEUS SERVIÇOS" /></div>
                        <div className='tabContainer'><TabContainer /></div>
                        <div className='cardsConteiner'><CardsProducts handleClose={this.handleClose} openDetails={this.openDetails}/></div>
                        <div className='footerContainer'><Footer /></div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    online: state.auth.online,
    token: state.auth.token,
    msisdn: state.auth.msisdn,
    assinantesID: state.user.assinantesID,
    pontos: state.user.pontos,
    renovar: state.user.renovar,
    sva_produtos_id: state.user.sva_produtos_id,
    user_products: state.user.user_products,
    products: state.portfolio.products,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    startConnection,
    signIn,
    getProducts,
    addToPortfolio,
    removeToPortfolio,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)