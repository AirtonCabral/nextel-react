import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class AlertDialog extends Component {
    static defaultProps = {
        data: '',
        onOpen: false,
        handleClose: ()=>{console.log('missing callback function')},
    }
    render() {
        const props = this.props;
        // const contentProps = 'data' in props ? props.data : '';
        return (
            <Dialog
                open={props.onOpen}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{props.data.title}</DialogTitle>
                <DialogContent>
                        <h4 style={{textAlign:'center'}}>
                            { props.data.content }
                        </h4>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>
                        ENTENDI
                    </Button>
                </DialogActions>
            </Dialog>)
    }
}

export default AlertDialog;