import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChipsProduct from './chips_product';
import CircularProgress from '@material-ui/core/CircularProgress';

import './../sass/modalNews.scss';

const styles = {
    paper: {
        position: 'absolute',
        width: 600,
        height: 400,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        //   boxShadow: theme.shadows[5],
        padding: 10,
    },

};
const ConfirmModal = (props) => {
    let ChipsToShow = [];
    props.userProducts.map((v, i) => {
        ChipsToShow.push(
            <div style={{marginBottom:5}} key={i}>
                <ChipsProduct
                    data={v}
                    isDisabled={true}
                    alert={''} />
            </div>
        );
    });
    return (
        <div>
            <Grid container style={styles.paper} className='modalNews'>
            {/* <i xs={12} onClick={props.handleClose} className="fas fa-times"></i> */}
                <Grid item xs={12} className='header'>
                    <div style={{marginTop:30}}><label className='title'>SALVAR</label><br/>
                    <label>Tem certeza que deseja salvar as alterações?<br/>
                    Você só poderá alterar os serviços escolhidos na sua seleção em {props.renderNextDateAvailable}</label></div>
                </Grid>
                <Grid item xs={12}>
                    { ChipsToShow }
                </Grid>
                
                <Grid item xs={12} className='extraPoints'>
                    <label className='subtitle'>{'PONTOS UTILIZADOS: '+props.currentPoints}</label><br/>
                    <label className='subtitle'>{'PONTOS DISPONÍVEIS: '+props.remainPoints}</label>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large"
                        onClick={props.onSubmit}>
                            {props.savingProcess!=='start' && 'CONFIRMAR'}
                            {props.savingProcess==='start' && 
                                <CircularProgress size={16} style={{ color:'#FFF' }} />
                            }
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" className='backButton' size="large"
                    onClick={props.handleClose}>VOLTAR</Button>
                </Grid>
            </Grid>
        </div>
    )
};

export default ConfirmModal;