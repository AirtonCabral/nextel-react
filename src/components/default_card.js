import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToPortfolio, removeToPortfolio, alertMessage } from '../actions/a_user'
import { selectProduct } from '../actions/a_products'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
    colorSwitchBase: {
        color: 'white',
        '&$colorChecked': {
            color: 'white',
            '& + $colorBar': {
                backgroundColor: '#e15b1e',
                opacity: 1,
                height: 28,
                position: 'absolute',
                top: 17,
                left: 25,
                width: 46,
                height: 28,
            },
        },
    },
    colorBar: {
        color: '#e15b1e',
        top: 17,
        left: 25,
        width: 46,
        height: 28,
    },
    colorChecked: {
        color: 'purple',
        opacity: 1
    },
    card: {
        margin: '10px'
        // maxWidth: 345,
    },
    media: {
        // height: 140,
        height: '60px',
        paddingTop: '50%', // 16:9
    },
};

const missingUserPointsMessage = "Pontos insuficientes"

export class DefaultCard extends React.Component {

    // this.handleAlertDialog = this.handleAlertDialog.bind(this);
    // this.renderSwitchButtonClickCallback = this.renderSwitchButtonClickCallback.bind(this);

    renderNextDateAvailable() {
        let nextDate_month = new Date().getMonth() + 2;
        const nextDate_year = "/" + new Date().getFullYear();
        if (nextDate_month < 10) {
            nextDate_month = "0" + nextDate_month;
        }
        const nextDate_day = "01/";
        const nextDate_full = nextDate_day + nextDate_month + nextDate_year;
        const output = "Altere a partir de " + nextDate_full;
        return output;
    }

    handleAlertDialog() {
        
    }

    render() {
        const { classes, id, isSmall } = this.props;
        const data = this.props.products[id];

        // calculando total de pontos atual
        let currentPonts = 0;
        this.props.user_products.forEach(element => {
            currentPonts += element.pontos;
        });
        let cardPoints = data.pontos;
        let remaningPoints = this.props.pontos - currentPonts;

        let isSelected = false;
        let isAvailable = true;

        let tolltipStatusMessage = "";
        let nextDateAvailable = this.renderNextDateAvailable();

        // verifica se este card é um produto já seleciondo
        this.props.user_products.forEach(element => {
            if (element.id === data.id) {
                isSelected = true;
                // verifica se há carência para o user e bloqueia o card
                if (!this.props.renovar) {
                    this.props.sva_produtos_id.forEach(element => {
                        if (element === data.id) {
                            isAvailable = false;
                            tolltipStatusMessage = nextDateAvailable;
                        }
                    });
                }
            }
        });

        // se não es†á previamente selecionado
        // hora de verificar se tem saldo para este item
        if (!isSelected) {
            isAvailable = remaningPoints >= cardPoints ? true : false;
            tolltipStatusMessage = isAvailable ? "" : missingUserPointsMessage;
        }
        return (
            <div>
                <Card className={isSmall ? 'cardItem-reduzido' : 'cardItem'} id='cardOriginal'>
                    
                    <div style={styles.canvasContainer}>
                        <CardMedia
                            className={classes.media + ' midiaCard'}
                            image={data.img.display}
                            title={data.produto}
                            style={styles.canvas}
                        />
                    </div>

                    <CardContent className='contentCard'>
                        <Typography gutterBottom variant="subheading">
                            {data.produto}
                        </Typography>
                        <Typography variant='body2'>
                            {data.tags}
                        </Typography>
                        <hr />
                        <div className='contentCardCaption'>
                            <Typography disabled variant="caption" className='caption'>
                                {data.resumo}
                            </Typography>
                            <hr />
                        </div>
                        <Button className='detailsButton'
                            onClick={(() => this.props.selectProduct(data))}>Detalhes</Button>
                    </CardContent>

                    <CardActions className="cardPoints">
                        <FormGroup>
                            <Tooltip title={tolltipStatusMessage}>
                                <FormControlLabel
                                    className={!isAvailable ? 'invalido' : ''}
                                    control={
                                        <Switch
                                            onChange={() => {
                                                if (isSelected) {
                                                    this.props.removeToPortfolio(data);
                                                }
                                                else {
                                                    this.props.addToPortfolio(data);
                                                }
                                            }}
                                            value='selected'
                                            checked={isSelected}
                                            disabled={!isAvailable}
                                            aria-label="LoginSwitch"
                                            color="primary"
                                            classes={{
                                                switchBase: classes.colorSwitchBase,
                                                checked: classes.colorChecked,
                                                bar: classes.colorBar,
                                            }}
                                        />
                                    }
                                    onClick={()=>{
                                        if (!isAvailable) {
                                            const alertMessage = isSelected ? this.renderNextDateAvailable() : missingUserPointsMessage;
                                            return this.props.alertMessage({
                                                alert:true,
                                                alertData: {
                                                    title: '',
                                                    content: alertMessage,
                                                }
                                            });
                                        }
                                    }}
                                />
                            </Tooltip>
                        </FormGroup>
                    </CardActions>
                    <label className='points'>
                        {data.pontos} <span>pts</span>
                    </label>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    renovar: state.user.renovar,
    pontos: state.user.pontos,
    sva_produtos_id: state.user.sva_produtos_id,
    user_products: state.user.user_products,
    products: state.products.list,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addToPortfolio,
    removeToPortfolio,
    selectProduct,
    alertMessage,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(DefaultCard));
