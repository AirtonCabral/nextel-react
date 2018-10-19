import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadPage } from '../actions/a_dom'
import { startConnection } from '../actions/a_auth'
import { getProducts } from '../actions/a_products'
import { signIn } from '../actions/a_user'
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import orange from '@material-ui/core/colors/orange';
import withStyles from '@material-ui/core/styles/withStyles';
import { clearState } from './../lib/storage';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#FF5722',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#FF5722'
  },
});


//////////////////////////
//  BASE NAME ////////////
//////////////////////////
const basename_home = 'home';
//////////////////////////

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      isProcessing: false,
      buttonColorState: 'primary',
      buttonValueState: 'Entrar',
    };
    // console.log('-->> login builded');
  }

  loginApplication() {

    clearState();

    // let { login, password } = this.state;
    let msisdn = this.props.params.msisdn


    this.setState({ isProcessing: true, buttonValueState: 'Iniciando conexão' });

    // this.props.startConnection('drweb', 'n)CJL^?r4p#rYaG/R8A_', msisdn).then(() => { // login producao
    this.props.startConnection('drweb', 'c62J3rZovtw', msisdn).then(() => { // login dev homolog

      let buttonColorResult = this.props.online ? 'secondary' : this.state.buttonColorState;
      let buttonValueResult = this.props.online ? 'Seja bem vindo, Carregando Produtos...' : errorResultMessage;

      this.setState({
        buttonColorState: buttonColorResult,
        buttonValueState: buttonValueResult
      });

      this.props.getProducts().then(() => {
        this.setState({ buttonValueState: 'Baixando dados do Usuário...' });

        this.props.signIn().then(() => {

          // START PROJECT
          if (this.props.assinantesID !== null && this.props.assinantesID !== undefined) {
            setTimeout(() => {
              this.props.loadPage(basename_home)
            }, 300);
            this.setState({ buttonValueState: 'Tudo ok, iniciando...' });
          }
          else {
            this.updateStateOut('Ups, MSISDN Inválido.');
          }

        }) // end success signIn()
          .catch((error) => {
            this.updateStateOut('Ups, usuário indisponível ou instável. Recarregue a tela.');
          });

      }) // end success getProducts()
        .catch((error) => {
          this.updateStateOut('Ups, produtos insdisponíveis para este número "msisdn".');
        });

    }) // end success startConnection()
      .catch((error) => {
        this.updateStateOut('Ups, erro ao tentar se conectar. Recarregue a tela.');
      });

  }

  updateStateOut(msg) {
    this.setState({
      isProcessing: false,
      buttonValueState: msg
    });
  }

  componentDidMount() {
    // console.log('-->> login mounted');
    return this.loginApplication();
  }

  render() {

    const { classes, params } = this.props;
    const isCentral = 'atendente' in params && params.atendente !== '' ? true : false;
    const loginPageTitle = isCentral ? 'Central Serviços VAS' : 'Nextel Serviços VAS'
    const messageOut = this.state.buttonValueState;

    // const errorResultMessage = 'Error  :(  Recarregue a página.';

    // if (this.props.assinantesID !== null && this.props.assinantesID !== undefined) {
    //   messageOut = 'Logado!'
    // }

    if (this.props.userError !== '') {
      return (<div>
        {this.state.buttonValueState}
      </div>)
    }
    const stageHeight = window.innerHeight
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: stageHeight}}>
        <CircularProgress style={{ color: orange[600] }} />
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  online: state.auth.online,
  assinantesID: state.user.assinantesID,
  pageLoaded: state.dom.page,
  params: state.dom.params,
  userError: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  startConnection,
  signIn,
  getProducts,
  loadPage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login))

