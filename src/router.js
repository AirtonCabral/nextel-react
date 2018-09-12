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
            : <Redirect to='/404' />
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

//////////////////////////
//  BASE NAME ////////////
//////////////////////////
const basename_root = '/';
const basename_client = '/cliente';
const basename_home = '/home';
const basename_client_home = '/cliente/home';
//////////////////////////

export class SiteRouter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading...'
        }
    }
    
    componentDidMount() {
        // console.log('didmont', this.props.auth.token);
        // Cria um callback ao evento onLoad do DOM
        window.addEventListener('load', () => {
            const params = parseGetParams(window.location);
            const path = window.location.pathname;

            // controle de acesso 'cliente x central'
            if (path === basename_root) {
                // console.log('Origem: central de atendimento');
                if ('msisdn' in params && params.msisdn !== '') {
                    // console.log('MSISDN Ok: ', params.msisdn);
                    this.props.loadPage(path, params);
                }
                else {
                    // console.log('MSISDN Missing :(');
                    this.setState({
                        message: 'Msisdn não encontrado'
                    });
                }
            }
            else if (path === basename_client) {
                // console.log('Origem: acesso cliente');
                if ('msisdn' in params && params.msisdn !== '') {
                    // console.log('MSISDN Ok: ', params.msisdn);
                    this.props.loadPage(path, params)
                }
                else {
                    // console.log('MSISDN Missing :(');
                    this.setState({
                        message: 'Msisdn não encontrado'
                    });
                }
            }
            else if (path === basename_home || path === basename_client_home) {
                if ('token' in this.props.auth && this.props.auth.token === null) {
                    this.setState({
                        message: 'Acesso negado'
                    });
                }
                else {
                    this.props.loadPage(path, params)
                }
            }
            else {
                this.setState({
                    message: '404  Not found'
                });
            }
        });
    }

    render() {
        // console.log('router render()', this.props.page);
        if (this.props.page === null) {
            return (
                <Loading status={this.state.message} />
            )
        }
        else {
            return (
                <Router basename_root={basename_root}>
                    <Switch>
                        <Route exact path={basename_root} component={Login} />
                        <Route exact path={basename_client} component={Login} />
                        <PrivateRoute exact path={basename_home} component={Home} auth={this.props.auth} />
                        <PrivateRoute exact path={basename_client_home} component={Home} auth={this.props.auth} />
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
