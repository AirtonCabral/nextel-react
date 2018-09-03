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
            <Grid item xs={12} className='header'>
                <label className='title'>SALVAR</label><br/>
                <label>{'Atenção: esta seleção somente poderá ser alterada após: '+props.renderNextDateAvailable}</label>
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
                onClick={props.onSubmit}>CONFIRMAR</Button>
            </Grid>
        </Grid>
        </div>
    )
};

export default ConfirmModal;