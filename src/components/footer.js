import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'

import './../sass/footer.scss';



const footer = (props) => {
    return(
        <div className='footer'>
        <label className='switchLabel'> Meus Serviços </label>
            <AppBar className='controlPoints' position="static" color="default">
                <Grid item xs={12} >
                <div className='boxCircular'>
                    <CircularProgress className='circularProgress'  variant="static" value={props.calcCount} />
                    <Grid item className="pointsProgress">
                        <label><span>{props.count}</span>/{props.limitCount}<br/></label>
                        <label className='points'>pontos</label>
                    </Grid>
                </div>
                <div className='boxFooter'>
                    <label> pontos <br /> usados </label>
                    <Grid container className='boxContratados'>
                        <Grid item className="itemContratado">
                            <img src='https://picsum.photos/20' alt='img' />
                            <label className='title' >Cartoon Network</label>
                            <i className="fas fa-times"></i>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" size="large" disabled={props.count > props.limitCount}>SALVAR</Button>
                </div>
                </Grid>
            </AppBar>
        </div>
    )
}
export default footer;