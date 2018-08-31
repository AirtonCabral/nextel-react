import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChipsProduct from './chips_product';

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
    return (
        <div>
        <Grid container style={styles.paper} className='modalNews'>
            <Grid item xs={12} className='header'>
                <label className='title'>SALVAR</label><br/>
                <label>Ao confirmar sua seleção, você só poderá altera-la em 30 dias.</label>
            </Grid>
            <Grid item xs={12}>
                Aqui vai o ChipsProduct
            </Grid>
            
            <Grid item xs={12} className='extraPoints'>
                <label className='subtitle'>PONTOS UTILIZADOS: 6</label><br/>
                <label className='subtitle'>PONTOS TOTAL: 30</label> - <label className='subtitle'>PONTOS DISPONÍVEIS: 14</label>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large"
                onClick={props.handleClose}>CONFIRMAR</Button>
                <Button variant="contained" color="primary" size="large"
                onClick={props.handleClose}>voltar</Button>
            </Grid>
        </Grid>
        </div>
    )
};

export default ConfirmModal;