import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    return (
        <div>
        <Grid container style={styles.paper} className='modalNews'>
            <Grid item xs={12} className='header'>
                <label className='title'>TEM NOVIDADE POR AQUI!</label><br/>
                <label>Percebemos que você alterou seu plano.<br/> Você pode fazer uma nova seleção de serviços com a sua pontuação</label>
            </Grid>
            <Grid container xs={12} className='yourServices'>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <label>SEUS SERVIÇOS JÁ CONTRATADOS</label><br/>
                    <Grid item xs={12} className="myservices">
                        <Grid item>
                            <img src='https://picsum.photos/80' alt='' />
                        </Grid>
                        <Grid container className="descriptService">
                            <Grid item xs={12}>
                                <label> LOOK</label><br />
                            </Grid>
                            <Grid item xs={12}>
                                <span>Conteudo de TV</span>
                            </Grid>
                        </Grid>
                        <Grid item className='infosChannel'>
                            <label> Assista aos melhores filmes, series, animações e afins. Tudo no conforto da sua casa.</label>
                        </Grid>
                        <Grid item className="pointsService">
                            <label><span>3</span>pts</label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid item xs={12} className='extraPoints'>
                <label className='subtitle'>VOCE GANHOU MAIS</label>
                <p className='title'>10 PONTOS</p>
                <label className='subtitle'>VOCE TEM UM TOTAL DE 14 PONTOS</label>
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