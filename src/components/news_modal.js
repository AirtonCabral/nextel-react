import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChipsProduct from './chips_product';
import Button from '@material-ui/core/Button';

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
const NewsModal = (props) => {
    let ChipsToShow = [];
    props.userProducts.map((v, i) => {
        ChipsToShow.push(
            <div style={{marginTop:10}} key={i}>
                <ChipsProduct
                    data={v}
                    isDisabled={true}
                    alert={''} />
            </div>
        );
    });
    const texto1 = 'Este são os produtos sugeridos para sua';
    const texto2 = 'nova quantidade de pontos, mas você pode';
    const texto3 = 'personalizar novamente sua seleção.';
    return (
        <div>
        <Grid container style={styles.paper} className='modalNews'>
        {/* <i xs={12} onClick={props.handleClose} className="fas fa-times"></i> */}
            <Grid item xs={12} className='header'>
                <label className='title'>TEM NOVIDADE POR AQUI...</label><br/>
                <label>Você alterou seu plano Nextel, por isso sua qunatidade de pontos mudou.</label>
            </Grid>
            <Grid container xs={12} className='yourServices'>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <label>{texto1}</label><br />
                    <label>{texto2}</label><br />
                    <label>{texto3}</label>
                    { ChipsToShow }
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid item xs={12} className='extraPoints'>
                <label className='subtitle'>VOCE TEM TOTAL DE</label>
                <p className='title'>{props.totalPoints+' PONTOS'}</p>
                <label className='subtitle'>{'ATUALMENTE '+props.currentPoints+' UTILIZADOS'}</label>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large"
                onClick={props.handleClose}>Entendi</Button>
            </Grid>
        </Grid>
        </div>
    )
};

export default NewsModal