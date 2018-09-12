import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ChipsProduct from './chips_product';

const styles = {
    paper: {
        // position: 'absolute',
        // width: 600,
        // height: 400,
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // backgroundColor: '#FFFFFF',
        //   boxShadow: theme.shadows[5],
        // padding: 10,
    },
};

const WelcomeModal = (props) => {

    const textoPontos1 = 'Você tem ' + props.totalPoints + ' pontos totais para utilizar.';
    const textoPontos2 = 'Personalize sua seleção de serviços à vontade';
    const textoPontos3 = 'até o limite dos seus pontos.'
    const textoPacotes1 = 'Enquanto você não personaliza';
    const textoPacotes2 = 'sua seleção, separamos alguns';
    const textoPacotes3 = 'serviços que podem interessar você.'

    let current_points_percent = 0;
    current_points_percent = (props.currentPoints / props.totalPoints) * 100;
    let ChipsToShow = [];

    props.userProducts.map((v, i) => {
        ChipsToShow.push(
            <div style={{ marginTop: 10 }} key={i}>
                <ChipsProduct
                    data={v}
                    isDisabled={true}
                    alert={''} />
            </div>
        );
    });
    return (
        <div style={{height: '100%', overflow: 'hidden'}}>
            <Grid container className='modalStart'>

                <i className="fas fa-times" onClick={props.handleClose}></i>

                <Grid item xs={12} className='header'>
                    <label className='title'>SEJA BEM VINDO!</label>
                    <p className='subtitle'>VAMOS COMEÇAR?</p>
                    <label>
                        Escolha os serviços que vão fazer parte do seu pacote.
                </label>
                </Grid>

                <Grid item xs={12} sm={6} className='controlPoints'>
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

                <Grid item xs={12} sm={6} className='boxChips'>
                    {/* <label style={{fontSize:14}}>Enquanto você não personaliza<br />
                sua seleção, separamos alguns<br />
                serviços que podem interessar você.</label> */}
                    <div style={{ marginBottom: 20 }}>
                        <label>{textoPacotes1}</label><br />
                        <label>{textoPacotes2}</label><br />
                        <label>{textoPacotes3}</label>
                    </div>
                    {ChipsToShow}
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large"
                        onClick={props.handleClose}>Entendi</Button>
                        <br />
                        <br />
                </Grid>
            </Grid>
        </div>
    )
}

export default WelcomeModal;