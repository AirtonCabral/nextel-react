import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ComoFunciona extends Component {
    render() {
        return (
          <Dialog
            open={this.props.onOpen}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"COMO FUNCIONA"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <p>
                Cliente Nextel pode escolher quais benefícios deseja usufruir sem nenhum custo adicional!
            </p>
            <p>
                Basta escolher entre as opções disponíveis e utilizar seus pontos para ativar o serviço desejado.
            </p>          
            <p>
                Cada R$1,00 do valor do plano, equivale a 1 ponto a ser utilizado.
            </p>          
            <p>
                Por exemplo, se o valor de fatura é de R$ 60,00, o cliente tem 60 pontos para contratação de um ou mais os serviços.
            </p>          
            <p>
                Os pontos não são cumulativos e não expiram para os meses seguintes.
            </p>          
            <h4>
                Como é feita a escolha dos serviços?
            </h4>          
            <p>
                O cliente pode, a qualquer momento, escolher seus serviços até o limite de pontos. 
            </p>          
            <p>
                Depois de escolhidos os serviços, o cliente só poderá trocá-los por novos serviços a partir do dia 1º do mês seguinte. Até lá, pode usufruir de todos os serviços já ativados.
            </p>          
            <p>
                Pode haver trocas todos os meses.
            </p>
            <h4>
                Variação na quantidade de pontos
            </h4>          
            <p>
                Se o cliente realizar qualquer alteração no valor do seu plano, a quantidade de pontos acompanha o novo valor. Seja para cima ou para baixo.
            </p>
            <p>
                Para entender toda a Promoção, consulte o Regulamento.
            </p>
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

export default ComoFunciona;