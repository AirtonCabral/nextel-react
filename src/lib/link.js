import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadPage } from '../actions/a_dom'


export class ConnectedLink extends React.Component {
    handleClick = () => {
        if (this.props.loadPage) this.props.loadPage(this.props.to)
        else console.warn('ConnectedLink foi chamado sem especificar prop loadPage')
    }

    render() {
        // Evita warning de DOM
        const filtered = { ...this.props }
        delete filtered.loadPage

        return (
            <Link {...filtered} onClick={this.handleClick}>{this.props.children}</Link>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPage
}, dispatch)

export default connect(() => ({}), mapDispatchToProps)(ConnectedLink)