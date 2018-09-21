import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Ajuda extends Component {
    render() {
        return (
          <Dialog
            open={this.props.onOpen}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <h2>Ficou com dúvidas sobre como usar seus pontos?</h2>
            <h3>
            Acesse o atendimento pelo site ou ligue 1050 e fale conosco
            </h3>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.handleClose}>
          ENTENDI
        </Button>
      </DialogActions>
    </Dialog>)
  }
}

export default Ajuda;