import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeToPortfolio, saveToPortfolio } from '../actions/a_user'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import './../sass/footer.scss';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';
import ChipsProduct from './chips_product_footer';
import SalvarControl from './salvar_control';

export class Footer extends React.Component {

    render() {

        let current_points_percent = 0;
        current_points_percent = (this.props.currentPoints / this.props.pontos) * 100;

        // montagem dos thumbs
        let cardToShow = [];
        this.props.user_products.map((v, i) => {
            let isDisabled = false;
            let tolltipStatusMessage = '';
            if (!this.props.renovar) {
                this.props.sva_produtos_id.forEach(element => {
                    if (v.id === element) {
                        isDisabled = true;
                        tolltipStatusMessage = "Altere a partir de " + this.props.renderNextDateAvailable;
                    }
                });
            }
            cardToShow.push(
                // <div key={i} className='footerCenterContainer'>
                // <div key={i}>
                    <ChipsProduct
                        data={v}
                        key={i}
                        disableTitle
                        isDisabled={isDisabled}
                        alert={tolltipStatusMessage}
                        onRemove={(item) => {
                            this.props.removeToPortfolio(item);
                        }} />
                // </div>
            );
        });
        let currentPoints = this.props.pontos-this.props.currentPoints;
        return (
            <div className='footer' >

                <label  className='switchLabel desktop'>{'MEUS SERVIÇOS'}: {currentPoints} PONTOS RESTANTES </label>
                {/* <button className='switchLabel mobile' onClick={this.props.handleFooter}>{'MEUS SERVIÇOS'}: ( {currentPoints } PONTOS RESTANTES )</button> */}

                <AppBar className='controlPoints' position="static" color="default">
                    <div className='footerContainer'>

                        {/* CIRCLE COUNTER */}
                        <div className='footerLeft'>
                            <div className='footerLeftContainer'>
                                <div className='boxCircular'>
                                    <CircularProgress className='circularProgress' variant="static" value={current_points_percent} />
                                    <Grid item className="pointsProgress">
                                        <label>{this.props.currentPoints}/<span>{this.props.pontos}</span><br /></label>
                                        <label className='points'>pontos</label>
                                    </Grid>
                                </div>
                            </div>
                        </div>

                        {/* LISTA PRODUTOS */}
                        <div className='footerCenter'>
                            <div className='footerCenterContainer'>
                            {
                                cardToShow // produtos do user
                            }
                            </div>
                        </div>

                        {/* BOTÃO SALVAR */}
                        <div className='footerRight'>
                            <div className='footerRightContainer2 mobiletoshow'>
                                <Button
                                    onClick={this.props.handleFooter}>
                                    {currentPoints+' PONTOS RESTANTES'}
                                </Button>
                            </div>
                            <div className='footerRightContainer'>
                                <SalvarControl
                                    svaProdutosId={this.props.sva_produtos_id}
                                    userProducts={this.props.user_products}
                                    handleSaveAction={()=>this.props.saveToPortfolio()} />
                            </div>
                        </div>
                        <div className='footerMobile'>
                            <div className='footerCenterContainer'>
                            {
                                cardToShow // produtos do user
                            }
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
    saveToPortfolio,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Footer)