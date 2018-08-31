import React from 'react'
import { Route, Router, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Conexão ao Redux
import { history } from './store'
import { loadPage } from './actions/a_dom'

// Páginas do Site
import Home from './pages/home'
import Page404 from './pages/404';
import { parseGetParams } from './lib/url';

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
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
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