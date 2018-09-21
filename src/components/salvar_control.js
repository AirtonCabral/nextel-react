import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

class SaveControl extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    // this.setState({ open: false });
  };

  render() {
    let isActive = false;
    let countCheck = 0; //this.props.userProducts.length;
    let tolltipMessage = '';

    // verifica status dos produtos
    // ajusta variável de estado
    // if (countCheck!==this.props.svaProdutosId.length) {
      //   isActive = true;
      // }
      
    if (this.props.userProducts.length === this.props.svaProdutosId.length) {
      this.props.userProducts.forEach(element => {
        this.props.svaProdutosId.forEach(compare => {
          if (element.id === compare) { countCheck++; };
        });
      });
      if (countCheck !== this.props.svaProdutosId.length) {
        isActive = true;
      }
    }
    else {
      isActive = true;
    }
    
    isActive ? tolltipMessage = 'ATUALIZAR MEU PORTFÓLIO' : tolltipMessage = 'Tudo salvo!';
    
    if (this.props.userProducts.length === 0) {
      tolltipMessage = 'Impossível salvar vazio';
      isActive = false;
    }

    return (
      <div>
        <Tooltip title={tolltipMessage} placement="top">
          <div>
            <Button
              disabled={!isActive}
              variant="contained"
              color="primary"
              size="large"
              onClick={()=>this.props.handleSaveAction()}>
              {'SALVAR'}
            </Button>
          </div>
        </Tooltip>
        {/* <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Entendi
              </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

export default SaveControl;
