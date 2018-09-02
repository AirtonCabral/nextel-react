import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startConnection, signIn } from '../actions/a_auth'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          msisdn: '',
          login: '',
          password: '',
          isProcessing: false,
          buttonColorState: 'primary',
          buttonValueState: 'Entrar',
        };
    }

    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography variant="headline">Entrar</Typography>
                <form
                  className={classes.form}
                  action="/"
                  method="POST"
                  onSubmit={(event) => {
                    event.preventDefault();
                    let {msisdn, login, password} = this.state;
                    this.setState({ isProcessing: true, buttonValueState: 'Iniciando conexão' }, ()=>{

                      // this.props.startConnection(login, password, msisdn).then(()=>{
                        this.props.startConnection('drweb', 'c62J3rZovtw', '5521998526556').then(()=>{
                          
                          let buttonColorResult = this.props.online ? 'secondary' : this.state.buttonColorState;
                          let buttonValueResult = this.props.online ? 'Seja bem vindo, conenctando...' : 'Error  :(  Tentar novamente.';
                          
                          this.setState({ buttonColorState: buttonColorResult, buttonValueState: buttonValueResult });
                          
                          this.props.signIn(this.props.auth, this.props.msisdn).then(()=>{
                            this.setState({ isProcessing: false, buttonValueState: 'Redirecionando' });
                            setTimeout(() => {
                                this.props.history.push('/home')
                              }, 1000);
                            });

                      });

                    });
                  }}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">MSISDN</InputLabel>
                  <Input
                    id="msisdn"
                    name="msisdn"
                    autoComplete="msisdn"
                    value={this.state.msisdn}
                    autoFocus
                    onChange={event=>{
                      this.setState({ msisdn: event.target.value });
                    }} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
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
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={event=>{
                      this.setState({ password: event.target.value });
                    }} />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  disabled={this.state.isProcessing}
                  variant="raised"
                  color={this.state.buttonColorState}
                  className={classes.submit}>
                    {this.state.buttonValueState}
                </Button>
              </form>
            </Paper>
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
    token: state.auth.token,
    msisdn: state.auth.msisdn,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    startConnection,
    signIn,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login))
