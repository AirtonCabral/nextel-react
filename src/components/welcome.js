import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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

const WelcomeModal = (props) => {
    return (
        <div>
        <Grid container style={styles.paper} className='modalStart'>
                <Grid item xs={12} className='header'>
                    <label className='title'>SEJA BEM VINDO!</label>
                    <p className='subtitle'>VAMOS COMEÇAR?</p>
                    <label>Aqui você pode personalizar sua seleçãode produtos adicionais <br />
                    e escoher o que mais interessa a você.</label>
                </Grid>
                <Grid item xs={12} sm={5} className='controlPoints'>
                    <label>Aqui você controla seus pontos<br/>
                    Você começa com (20 pontos)<br/>
                    dependendo do seu contrato.
                    </label>
                    <Grid item xs={12}>
                        <CircularProgress className='circularProgress'  variant="static" value={80} />
                        <Grid item className="pointsProgress">
                            <label><span>14</span>/20<br/></label>
                            <label className='points'>pontos</label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <label>SEUS SERVIÇOS JÁ CONTRATADOS</label>
                    <Grid item xs={12} className="myservices">
                        <Grid item>
                            <img src='https://picsum.photos/50' alt='' />
                        </Grid>
                        <Grid item className="descriptService">
                            <label> LOOK</label><br />
                            <i className="fas fa-tv"></i> <span>Conteudo de TV</span>
                        </Grid>
                        <Grid item className="pointsService">
                            <label><span>3</span>pts</label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large"
                    onClick={props.handleClose}>Entendi</Button>
                </Grid>
            </Grid>
            </div>
    )
}

export default WelcomeModal;