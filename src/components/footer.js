import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeToPortfolio } from '../actions/a_user'

import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import './../sass/footer.scss';
import AliceCarousel from 'react-alice-carousel';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';
import ChipsProduct from './chips_product';
import AlertDialog from './alert_dialog';

export class Footer extends React.Component {

    componentDidMount() {
        // console.log('footer didmount', this.props.user_products);
    }

    componentDidUpdate() {
        console.log('update: se houver alteração dos serviços = shake!');
    }

    renderNextDateAvailable() {
        let nextDate_month = new Date().getMonth() + 2;
        let nextDate_year = "/" + new Date().getFullYear();
        if (nextDate_month < 10) {
            nextDate_month = "0" + nextDate_month;
        }
        let nextDate_day = "01/";
        let nextDate_full = nextDate_day + nextDate_month + nextDate_year;
        return (
            nextDate_full
        )
    }

    render() {

        // contagem de pontos
        let current_points = 0;
        let current_points_percent = 0;
        this.props.user_products.map((v, i) => {
            current_points += v.pontos;
        });
        current_points_percent = (current_points / this.props.pontos) * 100;

        // montagem dos thumbs
        let cardToShow = [];
        this.props.user_products.map((v, i) => {
            let isDisabled = false;
            let tolltipStatusMessage = '';
            if (this.props.renovar) {
                this.props.sva_produtos_id.forEach(element => {
                    if (v.id === element) {
                        isDisabled = true;
                        tolltipStatusMessage = "Período de carência até " + this.renderNextDateAvailable();
                    }
                });
            }
            cardToShow.push(
                <div key={i} className='footerCenterContainer'>
                    <ChipsProduct
                        data={v}
                        isDisabled={isDisabled}
                        alert={tolltipStatusMessage}
                        onRemove={(item) => {
                            this.props.removeToPortfolio(item);
                        }} />
                </div>
            );
        });

        // texto tolltip botão 'salvar'
        const submitButtonAlert = 'Atenção\nEsta ação poderá ser desfeita apenas a partir do dia '+this.renderNextDateAvailable();

        return (
            <div className='footer'>

                <label className='switchLabel'>{'Meus Serviços'}</label>
                <AppBar className='controlPoints' position="static" color="default">
                    <div className='footerContainer'>

                        {/* CIRCLE COUNTER */}
                        <div className='footerLeft'>
                            <div className='footerLeftContainer'>
                                <div className='boxCircular'>
                                    <CircularProgress className='circularProgress' variant="static" value={current_points_percent} />
                                    <Grid item className="pointsProgress">
                                        <label>{current_points}/<span>{this.props.pontos}</span><br /></label>
                                        <label className='points'>pontos</label>
                                    </Grid>
                                </div>
                            </div>
                        </div>

                        {/* LISTA PRODUTOS */}
                        <div className='footerCenter'>
                            <div className='footerCenterContainer'>
                                {cardToShow}
                            </div>
                        </div>

                        {/* BOTÃO SALVAR */}
                        <div className='footerRight'>
                            <div className='footerRightContainer'>
                                <Tooltip title={submitButtonAlert} placement="top">
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled={current_points > this.props.pontos_totais}>
                                        {'SALVAR'}
                                    </Button> */}
                                    <AlertDialog />
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                </AppBar>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    assinantesID: state.user.assinantesID,
    pontos: state.user.pontos,
    renovar: state.user.renovar,
    user_products: state.user.user_products,
    sva_produtos_id: state.user.sva_produtos_id,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    removeToPortfolio,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Footer)