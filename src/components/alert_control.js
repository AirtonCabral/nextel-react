import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AlertDialog from './alert';
import { alertMessage } from './../actions/a_user'

export class AlertControl extends React.Component {

    constructor(props) {
        super(props);
        this.handleCloseAlertDialog = this.handleCloseAlertDialog.bind(this);
    }

    handleCloseAlertDialog() {
        this.props.alertMessage({
            alert:false,
            alertData: {
                title: '',
                content: '',
            }
        });
    }

    render() {
        return (
            <AlertDialog
                data={this.props.alertData}
                open={this.props.alert}
                handleClose={this.handleCloseAlertDialog} />
        );
    };

}

const mapStateToProps = state => ({
    alert: state.user.alert,
    alertData: state.user.alertData,
    pontos: state.user.pontos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    alertMessage,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AlertControl)