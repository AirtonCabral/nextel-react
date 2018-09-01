import React from 'react'
import { Route, Router, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Conexão ao Redux
import { history } from './store'
import { loadPage } from './actions/a_dom'

// Páginas do Site
import Login from './pages/login'
import Home from './pages/home'
import Page404 from './pages/404';
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
        token: PropTypes.string.isRequired,
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
            // <Router basename={'/'} history={history}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                </Switch>
            </Router>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth: state.auth,
//     }
// }

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPage,
}, dispatch)

export default connect(null, mapDispatchToProps)(SiteRouter)