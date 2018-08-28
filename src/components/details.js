import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AliceCarousel from 'react-alice-carousel';

import './../sass/details.scss';

const styles = {
    paper: {
        position: 'absolute',
        width: 600,
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
    //   boxShadow: theme.shadows[5],
        padding: 10,
    },
    colorChecked: {
        color: 'white',
        '&$colorChecked': {
            color: '#4eb50c',
            '& + $colorBar': {
                backgroundColor: '#4eb50c',
            },
        },
    },
};

const responsive = {
    0: { items: 1 }
};

const details = (props) => {
    let value = 0;
    return (
        <div>
        <Grid container style={styles.paper} className='details'>
            <Grid xs={3} >
                <img src='https://picsum.photos/200/130' alt='imagem do conteudo '
                className='imgProduto' />
            </Grid>
            <Grid xs={5} >
                <CardContent className='contentCard'>
                <hr />
                    <Typography gutterBottom variant="subheading">
                        {props.details.produto}
                    </Typography>
                    <Typography variant='heading'>
                        {props.details.tags}
                    </Typography>
                    <hr />
                    <Typography variant="caption">
                        Os melhores desenhos infantis para você e seu filho assistirem 24 horas por dia, quando e onde quiser.
                    </Typography>
                </CardContent>
            </Grid>
            <Grid xs={4} >
                <CardActions className="cardPoints">
                <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                //onChange={props.handleChange}
                                //onClick={((e) => props.handleSwitch(e, this.props.data))}
                                aria-label="LoginSwitch"
                                className={{
                                    checked: styles.colorChecked
                                }}/>
                            }
                        />
                    </FormGroup>
                </CardActions>
                <label className='points'>
                    {props.details.pontos} <span>pts</span>
                </label>
            </Grid>
            <Grid item xs={3}>
                <AliceCarousel
                    infinite={false}
                    startIndex={0}
                    mouseDragEnabled={true}
                    buttonsDisabled={true}
                    responsive={responsive}>
                            <img src='https://picsum.photos/170/300' className='imgCaroussel'/>
                            <img src='https://picsum.photos/170/300' className='imgCaroussel'/>
                            <img src='https://picsum.photos/170/300' className='imgCaroussel'/>
                            <img src='https://picsum.photos/170/300' className='imgCaroussel'/>
                </AliceCarousel>
            </Grid>
            <Grid item xs={9}>
                <Tabs
                    //onChange={this.handleChange}
                    value={0}
                    scrollable
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    className='tabs'
                >
                    <Tab label="Vantagens" />
                    <Tab label="Como usar" />
                </Tabs>
                <Grid item>
                    <br />
                    <label>Clique no link abaixo para fazer o download do aplicativo.
                    <ul>
                        <li>Abra o aplicativo e faça seu login com os dados de cadastro.</li>
                        <li>Pronto! Agora é so aproveitar</li>
                    </ul>
                    BAIXAR APP <br />
                    Clique aqui para fazer o downloaddo aplicativo. Aproveite!
                    </label>
                </Grid>
            </Grid>
        </Grid>
        </div>
    );
}

export default details;