import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
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
            // '& + $colorBar': {
            //     backgroundColor: '#4eb50c',
            // },
        },
    },
};

const responsive = {
    0: { items: 1 }
};

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            <Grid container style={styles.paper} className='details'>
                <Grid>
                    <img src={this.props.details.IMG.IMGLOGO} style={{width:'100px', height:'100px'}} alt='imagem do conteudo ' />
                </Grid>
                <Grid >
                    <CardContent className='contentCard'>
                        <Typography gutterBottom variant="subheading">
                            {this.props.details.produto}
                        </Typography>
                        <Typography variant='body2'>
                            {this.props.details.tags}
                        </Typography>
                        <hr />
                        <Typography variant="caption">
                            {this.props.details.RESUMO}
                        </Typography>
                        <hr />
                    </CardContent>
                </Grid>
                <Grid>
                    <CardActions className="cardPoints">
                    <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={(event)=>{
                                            this.setState({ selected: event.target.checked }, () => {
                                                
                                            });
                                        }}
                                        value='selected'
                                        checked={this.state.selected}
                                        // aria-label="LoginSwitch"
                                        // color="primary"
                                        // style={{
                                        //     checked: classes.colorChecked
                                        // }}
                                    />
                                }
                            />
                        </FormGroup>
                    </CardActions>
                    {/* <label className='points'>
                        {this.props.details.pontos} <span>pts</span>
                    </label> */}
                </Grid>
                <Grid>
                    <AliceCarousel
                        infinite={false}
                        startIndex={0}
                        mouseDragEnabled={true}
                        buttonsDisabled={true}
                        responsive={responsive}>
                                <img src='https://picsum.photos/170/300' />
                                <img src='https://picsum.photos/170/300' />
                                <img src='https://picsum.photos/170/300' />
                                <img src='https://picsum.photos/170/300' />
                    </AliceCarousel>
                </Grid>
                {/* <Grid>
                    <Tabs
                        //onChange={this.handleChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        className='tabs'
                    >
                        <Tab label="Entretenimento" />
                        <Tab label="Conteúdo de TV" />
                    </Tabs>
                </Grid> */}
            </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Details);