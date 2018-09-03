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
import { parseGetParams } from './lib/url';

export const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => {
    let authenticated = false

    if (typeof auth.expiresOn === 'string') {
        var expiresOn
        try { expiresOn = new Date(JSON.parse(auth.expiresOn)) }
        catch(e) { expiresOn = new Date(auth.expiresOn) }
    }
    else var expiresOn = auth.expiresOn

    if (Boolean(auth.token) && expiresOn - new Date() > 0) authenticated = true

    return (
        <Route { ...rest } render={(props) => (
            // TODO: Deveríamos não apenas ver token, mas também ver idade do token.
            authenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
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

export class SiteRouter extends React.Component {
    // Cria um callback ao evento onLoad do DOM
    componentDidMount() {
        window.addEventListener('load', () => {
            let params = parseGetParams(window.location)
            this.props.loadPage(window.location.pathname, params)
        })
    }

    render() {
        return (
            // <Router history={history}>
            <Router basename={'/'}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/*" component={Home} auth={this.props.auth} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SiteRouter)
