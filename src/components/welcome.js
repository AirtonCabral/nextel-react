import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ChipsProduct from './chips_product';

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
    const textoPontos1 = 'Aqui você controla seus pontos';
    const textoPontos2 = 'Você começa com ('+props.totalPoints+' pontos)';
    const textoPontos3 = 'dependendo do seu contrato.'
    let current_points_percent = 0;
        current_points_percent = (props.currentPoints / props.totalPoints) * 100;
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
                    <label>{textoPontos1}</label><br />
                    <label>{textoPontos2}</label><br />
                    <label>{textoPontos3}</label>
                    
                    <div className='boxCircular'>
                        <CircularProgress className='circularProgress' variant="static" value={current_points_percent} />
                        <Grid item className="pointsProgress">
                            <label>{props.currentPoints}/<span>{props.totalPoints}</span><br /></label>
                            <label className='points'>pontos</label>
                        </Grid>
                    </div>

                </Grid>
                <Grid item xs={12} sm={7}>
                    <label>SEUS SERVIÇOS JÁ CONTRATADOS</label>
                    { ChipsToShow }
                    {/* <Grid item xs={12} className="myservices">
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
                    </Grid> */}
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