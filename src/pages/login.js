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
      this.setState({ isProcessing: true, buttonValueState: 'Iniciando conexão' }, () => {

        // this.props.startConnection(login, password, msisdn).then(()=>{
        // this.props.startConnection('drweb', 'c62J3rZovtw', '5521998526556').then(() => {
        this.props.startConnection('drweb', 'c62J3rZovtw', msisdn).then(() => {
        // this.props.startConnection('drweb', 'n)CJL^?r4p#rYaG/R8A_', msisdn).then(() => {

          let buttonColorResult = this.props.online ? 'secondary' : this.state.buttonColorState;
          let buttonValueResult = this.props.online ? 'Seja bem vindo, Carregando Produtos...' : errorResultMessage;
          this.setState({ buttonColorState: buttonColorResult, buttonValueState: buttonValueResult });

          
          this.props.getProducts().then(() => {
            this.setState({ buttonValueState: 'Baixando dados do Usuário...' });
            
            this.props.signIn().then(() => {
              // START PROJECT
              if (this.props.assinantesID !== null && this.props.assinantesID !== undefined) {
                this.setState({ buttonValueState: 'Tudo ok, Redirecionando...' }, ()=>{
                  setTimeout(() => {
                    this.props.loadPage(basename_home)
                    // if (this.props.pageLoaded === basename_root) {
                    // }
                    // else {
                    //   this.props.history.push(basename_client_home)
                    // }
                  }, 300);
                });
              }
              else {
                this.setState({
                  isProcessing: false, 
                  buttonValueState: 'Ups, MSISDN Inválido.'
                });
              }
            });
          });
        })
        .catch((error)=>{
          this.setState({
            isProcessing: false, 
            buttonValueState: 'Ups, houve alguma coisa. Recarregue a tela.'
          });
        });
      });

    }

    componentDidMount() {
      // console.log('-->> login mounted');
      return this.loginApplication();
    }
    
    render() {
      
      const { classes, params } = this.props;
      const isCentral = 'atendente' in params && params.atendente !== '' ? true:false;
      const loginPageTitle = isCentral ? 'Central Serviços VAS' : 'Nextel Serviços VAS'
      
      // const errorResultMessage = 'Error  :(  Recarregue a página.';
      // let messageOut = 'Verificando Msisdn...';
      
      // if (this.props.assinantesID !== null && this.props.assinantesID !== undefined) {
      //   messageOut = 'Logado!'
      // }
      
      // if (this.props.pageLoaded === basename_client) {
      //   return (<div>
      //     {messageOut}
      //   </div>)
      // }

      return (
        <React.Fragment>
          
          <CircularProgress style={{ color: orange[600] }} />
          <CssBaseline />

          <main className={classes.layout}>
            {/* <Paper className={classes.paper}> */}
              
              {/* <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar> */}

              {/* <Typography variant="headline">{ loginPageTitle }</Typography>
              {isCentral && <Typography>Atendente: {this.props.params.atendente}</Typography>}
              <Typography>MSISDN: {this.props.params.msisdn}</Typography> */}
              
              {/* <form
                className={classes.form}
                action="/"
                method="POST"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.loginApplication();
                }}> */}

                {/* <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Login</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.login}
                    onChange={event=>{
                      this.setState({ login: event.target.value });
                    }} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={event=>{
                      this.setState({ password: event.target.value });
                    }} />
                </FormControl> */}

                {/* <Button
                  type="submit"
                  fullWidth
                  disabled={this.state.isProcessing}
                  variant="raised"
                  color={this.state.buttonColorState}
                  className={classes.submit}>
                    {this.state.buttonValueState}
                </Button> */}

              {/* </form> */}

            {/* </Paper> */}
          </main>

        </React.Fragment>
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

