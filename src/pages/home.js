import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { attemptConnection, signIn, signOut, getServices } from '../actions/a_auth'
import './../sass/home.scss'

import Modal from '@material-ui/core/Modal';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import ConnectionStatus from './../components/connection_status';
import MenuAppBar from './../components/menu_app_bar';
import TabContainer from './../components/tabs_app';
import Footer from './../components/footer';
import Details from './../components/details';

import { MenuItem } from '@material-ui/core/Menu';

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

export class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        let msisdn = null;
        if (props.location.search) {
            let value = props.location.search;
            msisdn = value.split('=')[1];
        }
        else {
            msisdn = 'nenhum';
        }

        this.state = {
            consoleToggle: false,
            modalToggle: true,
            modalDetails: false,
            modalData:[],
            ready: false,
            messages: 'Iniciando',
            errors: {},
            count: 27,
            limitCount: 70,
            services: [],
            bleh:[],
            msisdn
        };
    }

    componentDidMount() {
        this.setState({ messages: 'Autenticando...'}, ()=> {

            this.props.attemptConnection('drweb', 'c62J3rZovtw', this.state.msisdn)
                .then(() => {
                    if (this.props.token && this.state.msisdn) {
                        
                        this.props.signIn(this.props.token, this.state.msisdn)
                        .then(() => {
                            
                            if (this.props.msisdn) {
                                this.setState({
                                    messages: 'Carregando Lista de Serviços',
                                }, ()=>{
                                    this.props.getServices(this.props.token)
                                    .then(() => {
                                            
                                        let message = ''
                                        if (this.props.services.length > 0) {
                                            message = 'Lista Carregada!'
                                        }
                                        else {
                                            message = 'Erro ao carregar lista de serviços'
                                        }
                                        this.setState({ messages: message}, ()=>{

                                            // START PROJECT
                                            setTimeout(() => {
                                                this.setState({
                                                    ready: true
                                                });
                                            }, 1000);

                                        });

                                    })
                                });
                            }
                            else{
                                this.setState({
                                    messages: 'Erro. Verifique o MSISDN.',
                                });
                            }
                            
                        })
    
                    }
                    else {
                        this.setState({ messages: 'Problemas com autenticação :('});
                    }
    
            })

        });

        const services =[]
        this.props.services.map( (elem,index) => {
            var idCounter = index;
            elem.selected = true;
            elem.id = idCounter;
            return services.push(elem);
        })
        this.setState({ services: services});
        var points = this.props.services.reduce( function( prevVal, elem ) {
            return prevVal + elem.pontos;
        }, 0 );
        this.setState({count: points});

        this.handleSwitch = this.handleSwitch.bind(this)
    }

    handleOpen = () => {
        this.setState({ modalToggle: true });
    };

    handleClose = () => {
        this.setState({ modalToggle: false });
    };
    openDetails = (e,data) => {
        console.log(data);
        this.setState({ modalDetails: true});
        this.setState({ modalData: data });
        console.log(this.state.modalDetails);
        console.log(this.state.modalData);
    };

    closeDetails = () => {
        this.setState({ modalDetails: false });
    };

    calcCount = () => {
        if(this.state.count > this.state.limitCount){
            return 100;
        } else {
            return this.state.count * 100 / this.state.limitCount;
        }
    }

    handleSwitch = (e, data) => {
        let oldState = this.state.services;
        let oldPoints = this.state.count;
        let bleh = data;
        oldState[bleh.id].selected = !oldState[bleh.id].selected;
        if(oldState[bleh.id].selected){
            oldPoints =  oldPoints + bleh.pontos;
        }else{
            oldPoints =  oldPoints - bleh.pontos;
        }
        this.setState({ services: oldState })
        this.setState({ count: oldPoints })
        console.log(data.pontos);
        console.log(oldState);
        this.calcCount();
    }
    
    render() {
        return (
            <div style={{}}>
                {this.state.ready &&
                <Modal open={this.state.modalDetails}
                    onClose={this.closeDetails}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description" >
                    <Details details={this.state.modalData} handleSwitch={this.handleSwitch} />
                </Modal>}

                {this.state.ready && <MenuAppBar title="PERSONALIZE SEUS SERVIÇOS" />}

                {this.state.ready &&
                <TabContainer itens={this.state.services}
                            openDetails ={this.openDetails}
                            handleSwitch={this.handleSwitch}/>}

                {!this.state.ready && <ConnectionStatus colors={{ main: '#f26522' }} status={this.state.ready} messages={this.state.messages} />}

                {this.state.ready && <Footer count={this.state.count} limitCount={this.state.limitCount} calcCount={this.calcCount()}/>}

                {this.state.ready && <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalToggle}
                    onClose={this.handleClose}
                >
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
								<Grid item direction="row" justify="flex-start" className="descriptService">
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
                </Modal>}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    online: state.auth.online,
    token: state.auth.token,
    msisdn: state.auth.msisdn,
    pontos: state.auth.pontos,
    services: state.auth.services,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    attemptConnection,
    getServices,
    signIn,
    signOut,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)