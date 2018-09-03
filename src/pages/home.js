import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToPortfolio, removeToPortfolio } from '../actions/a_user'
import { selectProduct } from '../actions/a_products'
import './../sass/home.scss'

// import Modal from '@material-ui/core/Modal';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

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
        //   boxShadow: theme.shadows[5],
        padding: 10,
    },
};

// var msisdn_received = null;

export class Home extends React.Component {
    constructor(props) {
        super(props);

        // let msisdn = null;
        // if (props.location.search) {
        //     let value = props.location.search;
        //     msisdn_received = value.split('=')[1];
        // }

        this.state = {
            // consoleToggle: false,
            modalToggle: true,
            typeContent: 2, //0 = modal inicial, 1 = detalhes, 2 = modal de News, 3= Confirm Modal
            modalDetails: false,
            modalData: [],
            ready: true,
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
        if (this.props.products.length === 0 ||
            this.props.sva_produtos_id.length === 0 ||
            this.props.user_products.length === 0 ) {
                setTimeout(() => { this.props.history.push('/login') }, 100);
        }
    }

    handleOpen = () => {
        this.setState({ 
            modalToggle: true,
            typeContent: 0
        });
    };

    handleClose = () => {
        // this.setState({ modalToggle: false });
        this.props.selectProduct(null)
    };

    openDetails = (e, data) => {
        this.setState({
            modalToggle: true,
            modalData: data,
            typeContent: 1
        });
    };

    closeDetails = () => {
        this.setState({ modalDetails: false });
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
                return <Details details={this.props.product_selected} handleSwitch={this.handleSwitch} /> ;
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
            let isContentDetailToOpen = false;
            let typeContent = 0;
            // verifica se é para abrir modal detalhes
            if (this.props.product_selected !== null) {
                isContentDetailToOpen = true;
                typeContent = 1;
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
                        <div className='footerContainer'><Footer /></div>
                    </div>

                    {/* <Modal 
                        open={this.state.modalDetails}
                        onClose={this.closeDetails}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description" >
                            <Details details={this.state.modalData} handleSwitch={this.handleSwitch} />
                    </Modal> */}

                    {/* <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={false}
                        onClose={this.handleClose}>

                        <Grid container style={styles.paper} className='modalStart'>
                            <Grid item xs={12} className='header'>
                                <label className='title'>SEJA BEM VINDO!</label>
                                <p className='subtitle'>VAMOS COMEÇAR?</p>
                                <label>Aqui você pode personalizar sua seleçãode produtos adicionais <br />
                                e escoher o que mais interessa a você.</label>
                            </Grid>
                            <Grid item xs={12} sm={5} className='controlPoints'>
                                <label>Aqui você controla seus pontos<br/>
                                Você começa com (20 pontos)<br/>
                                dependendo do seu contrato.
                                </label>
                                <Grid item xs={12}>
                                    <CircularProgress className='circularProgress'  variant="static" value={80} />
                                    <Grid item className="pointsProgress">
                                        <label><span>14</span>/20<br/></label>
                                        <label className='points'>pontos</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <label>SEUS SERVIÇOS JÁ CONTRATADOS</label>
                                <Grid item xs={12} className="myservices">
                                    <Grid item>
                                        <img src='https://picsum.photos/50' alt='' />
                                    </Grid>
                                    <Grid item className="descriptService">
                                        <label> LOOK</label><br />
                                        <i className="fas fa-tv"></i> <span>Conteudo de TV</span>
                                    </Grid>
                                    <Grid item className="pointsService">
                                        <label><span>3</span>pts</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" size="large"
                                onClick={this.handleClose}>Entendi</Button>
                            </Grid>
                        </Grid>
                    </Modal> */}

                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    // token: state.auth.token,
    // msisdn: state.auth.msisdn,
    // pontos: state.user.pontos,
    sva_produtos_id: state.user.sva_produtos_id,
    products: state.products.list,
    product_selected: state.products.product_selected,
    user_products: state.user.user_products,
    // online: state.auth.online,
    // assinantesID: state.user.assinantesID,
    // renovar: state.user.renovar,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addToPortfolio,
    removeToPortfolio,
    selectProduct,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)