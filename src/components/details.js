import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AliceCarousel from 'react-alice-carousel';

import './../sass/details.scss';

const styles = {

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

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            value: 'Como usar',
        }
    }

    componentDidMount() {

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    galleryItems() {
        let arrImgs = [];
        for (var key in this.props.details.img.howto) {
            const objchild = this.props.details.img.howto[key]
            arrImgs.push(objchild);
        }
        return (
            arrImgs.map((imgPath, i) => (
                <img src={imgPath} key={i} className="imgProdutoCarousel" />
            ))
        )
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const items = this.galleryItems();
        return (
            <div>

                <Grid container style={styles.paper} className='details'>

                    <i xs={12} onClick={this.props.handleClose} className="fas fa-times"></i>

                    <div style={{overflow:'auto', marginTop:30}}>
                        <Grid item xs={12} className='contentSuperior'>

                            <Grid item>
                                <img src={this.props.details.img.display} className='imgProduto' alt='imagem do conteudo ' />
                            </Grid>

                            <Grid item>
                                <CardContent className='contentCard'>
                                    <Typography gutterBottom variant="subheading">
                                        {this.props.details.produto}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {this.props.details.tags}
                                    </Typography>
                                    <hr />
                                    <Typography>
                                        {this.props.details.resumo}
                                    </Typography>
                                    <hr />
                                </CardContent>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} className='contentInferior'>
                            <Grid item className='carousel'>
                                <AliceCarousel
                                    items={items}
                                    dotsDisabled
                                    infinite
                                    autoPlay
                                    buttonsDisabled
                                    mouseDragEnabled={false}
                                    autoPlayInterval={4000}
                                    startIndex={0}
                                    responsive={responsive} />

                            </Grid>
                            <Grid className='contentTabs'>
                                <Typography>
                                    {this.props.details.descricao}
                                </Typography>
                                <br />
                                <br />
                                <Typography>
                                    COMO USAR:
                                </Typography>
                                <br />
                                <Typography>
                                    {this.props.details.comousar.titulo}
                                </Typography>
                                <br />
                                <Typography>
                                    <ul>
                                        <li><div dangerouslySetInnerHTML={{ __html: this.props.details.comousar.how1 }} /></li>
                                        <li><div dangerouslySetInnerHTML={{ __html: this.props.details.comousar.how2 }} /></li>
                                        <li><div dangerouslySetInnerHTML={{ __html: this.props.details.comousar.how3 }} /></li>
                                    </ul>
                                </Typography>
                                <Typography>
                                    {this.props.details.comousar.obs}
                                </Typography>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Details);