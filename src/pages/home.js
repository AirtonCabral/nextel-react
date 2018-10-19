import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToPortfolio, removeToPortfolio, setMessageSaw, sendPortfolioToApi, sendPortfolioDone, alertMessage } from '../actions/a_user'
import { selectProduct } from '../actions/a_products'
import { loadPage } from './../actions/a_dom'
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
import AlertDialog from './../components/alert';
import { clearState } from './../lib/storage';
import AlertControl from '../components/alert_control';


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
            forceModalClose: false,
            toggleFooter: false,
            modalDetails: false,
            modalData: [],
            ready: true,
            messages: 'Iniciando',
            errors: null,
        };
    }

    componentDidMount() {
        if (this.props.products.length === 0 ||
            this.props.sva_produtos_id.length === 0 ) {
                return this.props.loadPage('login');
        }
    }

    componentDidUpdate() {
        if (this.props.save_status === 'done' && !this.state.alertProccess) {
            let output_msg = 'SALVO COM SUCESSO';
            let output_cont = 'Protocolo: '+this.props.protocolo;
            if (this.props.save_msg !== "OK") {
                output_msg = 'Erro ao salvar';
                output_cont = this.props.save_msg;
            }
            this.props.alertMessage({
                alert:true,
                alertData: {
                    title: output_msg,
                    content: output_cont,
                }
            });
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
        // console.log('handclose', this.props.user_message_history)
        this.props.selectProduct(null);
        this.props.setMessageSaw(null);
        this.setState({forceModalClose:true});
        if (this.props.product_selected !== null) {
        }
        if (this.props.user_message_history !== null) {
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

    handleFooter = () => {
        const toggleFooterAtual = this.state.toggleFooter;
        this.setState({ toggleFooter: !toggleFooterAtual});
    }

    handleReload = () => {
        clearState();
        window.location.reload();
    };

    handleLogout = () => {
        clearState();
        window.location.reload();
    };

    renderSwitchModal(param) {
        switch(param) {
            case 0:
                return <WelcomeModal
                    userProducts={this.props.user_products}
                    remainPoints={this.getRemainPoints()}
                    currentPoints={this.getCurrentPoints()}
                    totalPoints={this.props.user_total_points}
                    handleClose={this.handleClose} />;
            case 1:
                return <NewsModal
                    userProducts={this.props.user_products}
                    remainPoints={this.getRemainPoints()}
                    currentPoints={this.getCurrentPoints()}
                    totalPoints={this.props.user_total_points}
                    handleClose={this.handleClose} />;
            case 3:
                return <ConfirmModal
                    userProducts={this.props.user_products}
                    handleClose={this.handleClose}
                    remainPoints={this.getRemainPoints()}
                    currentPoints={this.getCurrentPoints()}
                    renderNextDateAvailable={this.renderNextDateAvailable()}
                    savingProcess={this.props.save_status}
                    onSubmit={()=>{
                        this.props.sendPortfolioToApi().then(()=>{
                            this.handleClose();
                        });
                    }} />;
            case 4:
                return <Details
                    details={this.props.product_selected}
                    handleSwitch={this.handleSwitch}
                    handleClose={this.handleClose} /> ;
            default:
                return <div />;
         }
    }

    render() {
        // console.log('render', this.props.me)
        if (!this.state.ready) {
            return (
                <ConnectionStatus colors={{ main: '#f26522' }} status={this.state.ready} error={this.state.errors} messages={this.state.messages} />
            )
        }
        else {

            let isContentDetailToOpen = false;
            let typeContent = 0; // 0 = welcome, 1 = downgrade, 2= nothing, 3= Confirm Modal, 4=detalhes-produto
            
            if (this.props.product_selected !== null) { // aqui precisa fazer ainda uma verificação tal... (vou fazer depois)
                isContentDetailToOpen = true;
                typeContent = 4;
            }
            else if (this.props.user_message_history !== null) {
                isContentDetailToOpen = true;
                typeContent = 3;
            }
            else {
                switch (this.props.mensagem) {
                    case 0: 
                        isContentDetailToOpen = true;
                        typeContent = 0;
                            break;
                    case 1: 
                        isContentDetailToOpen = true;
                        typeContent = 1;
                            break;
                    case 2: 
                        typeContent = 2;
                        isContentDetailToOpen = false;
                            break;
                    default:
                        typeContent = 2;
                        isContentDetailToOpen = false;
                            break;
                }
            }
            return (
                <div>
                    <Modal
                        onClose={this.handleClose}
                        // open={this.state.modalToggle}
                        open={isContentDetailToOpen}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                            {this.renderSwitchModal(3)}
                    </Modal>

                    <AlertControl />

                    <div className='masterContainer'>
                        {/* <div className='barContainer'><MenuAppBar handleLogout={this.handleLogout} handleReload={this.handleReload} title="PERSONALIZE SEUS SERVIÇOS" /></div> */}
                        <div className='cardsConteiner'>
                            <CardsProducts 
                                toggleFooter={this.state.toggleFooter} />
                        </div>
                        <div className='tabContainer'>
                            <TabContainer />    
                        </div>
                        <div className={this.state.toggleFooter ? ' extendFooter' : ' footerContainer'}>
                            <Footer
                                renderNextDateAvailable={this.renderNextDateAvailable()}
                                currentPoints={this.getCurrentPoints()} 
                                handleFooter={this.handleFooter}
                                toggleFooter={this.state.toggleFooter} />
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
    mensagem: state.user.mensagem,
    save_status: state.user.save_status,
    save_msg: state.user.save_msg,
    protocolo: state.user.protocolo,
    user_products: state.user.user_products,
    user_message_history: state.user.user_message_history,
    user_total_points: state.user.pontos,
    params: state.dom.params,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addToPortfolio,
    removeToPortfolio,
    selectProduct,
    setMessageSaw,
    sendPortfolioToApi,
    loadPage,
    sendPortfolioDone,
    alertMessage,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)