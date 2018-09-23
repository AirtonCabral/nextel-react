import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

// Conexão ao Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPage } from './actions/a_dom'

// Páginas do Site
import Login from './pages/login'
import Home from './pages/home'
import Loading from './pages/loading'
import { parseGetParams } from './lib/url';

export const PrivateRoute = ({ component: Component, auth: auth, redirect: redirect, ...rest }) => {
    let authenticated = false

    if (typeof auth.expiresOn === 'string') {
        var expiresOn
        try { expiresOn = new Date(JSON.parse(auth.expiresOn)) }
        catch(e) { expiresOn = new Date(auth.expiresOn) }
    }
    else var expiresOn = auth.expiresOn

    if (Boolean(auth.token) && expiresOn - new Date() > 0) authenticated = true

    // if (!authenticated) {
    //     console.log('passou por aqui');
    //     return redirect();
    // }

    return (
        <Route { ...rest } render={(props) => (
            // TODO: Deveríamos não apenas ver token, mas também ver idade do token.
            authenticated
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
    auth: PropTypes.shape({
        token: PropTypes.string,
        expiresOn: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ])
    })
}

////////////////////////////////////////////////////
//  BASE NAME //////////////////////////////////////
////////////////////////////////////////////////////
// const basename_root = '/servicosvas.aspx';
const basename_root = '/';
const basename_login = basename_root+'login';
const basename_home = basename_root+'home';
////////////////////////////////////////////////////

export class SiteRouter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading...'
        }
    }
    
    componentDidMount() {
        // Cria um callback ao evento onLoad do DOM
        // window.addEventListener('load', () => {
            // console.log('window addEventListener load OK !!!');
            
            console.log('window.location --->>>', window.location);

            let message_output = this.state.message;
            let isReadyToLogin = false;
            const params = parseGetParams(window.location);
            
            console.log('params --->>>', params);

            if ('atendente' in params && params.atendente !== '') {
                if ('msisdn' in params && params.msisdn !== '') {
                    message_output = 'Acesso Central, msisdn, ok.';
                    isReadyToLogin = true;
                }
                else {
                    message_output = 'Central: msisdn não encontrado';
                }
            }
            else if ('msisdn' in params && params.msisdn !== '') {
                message_output = 'Acesso Cliente, msisdn, ok.';
                isReadyToLogin = true;
            }
            else if (this.props.auth.token !== null) {
                message_output = 'Acesso direto: localStorage';
                return this.props.loadPage(basename_home, params);
            }
            else {
                message_output = 'msisdn não encontrado';
            }

            console.log(message_output);
            this.setState({
                message: message_output
            });

            if (isReadyToLogin) {
                this.props.loadPage(basename_login, params);
            }
        // });
    }

    render() {
        
        console.log('render() props', this.props);

        if (this.props.page === null) {
            return (
                <Loading status={this.state.message} />
            )
        }
        else {
            return (
                <Router basename={basename_root}>
                    <Switch>
                        <Route          exact path={basename_root} component={Login} />
                        <PrivateRoute   exact path={basename_home}  component={Home} auth={this.props.auth} />
                    </Switch>
                </Router>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        page: state.dom.page,
        params: state.dom.params,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SiteRouter)
