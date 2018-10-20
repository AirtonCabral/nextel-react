import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeToPortfolio, saveToPortfolio, alertMessage } from '../actions/a_user'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import './../sass/footer.scss';
import ChipsProduct from './chips_product_footer';
import SalvarControl from './salvar_control';

export class Footer extends React.Component {

    getCurrentPoints() {
        let current_points = 0;
        this.props.user_products.forEach(element => {
            current_points += element.pontos;
        });
        return current_points;
    }

    getRemainPoints() {
        return this.props.user_total_points-this.getCurrentPoints();
    }

    render() {
        
        const current_points_percent = (this.getCurrentPoints() / this.props.pontos) * 100;
        const current_points_remain = this.props.pontos - this.getCurrentPoints();
        const isPlurall = current_points_remain > 1 ? true : false;
        const status_points_remain = 'MEUS SERVIÇOS: ' + current_points_remain + ' PONTO'+(isPlurall?'S':'')+' RESTANTE'+(isPlurall?'S':'');
        
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
                <ChipsProduct
                    data={v}
                    key={i}
                    disableTitle
                    isDisabled={isDisabled}
                    alert={tolltipStatusMessage}
                    alertMessage={(data) => {
                        this.props.alertMessage(data);
                    }}
                    onRemove={(item) => {
                        this.props.removeToPortfolio(item);
                    }} />
            );
        });
        return (
            <div className='footer' >

                <label  className='switchLabel desktop'>{status_points_remain}</label>

                <AppBar className='controlPoints' position="static" color="default">
                    <div className='footerContainer'>

                        {/* CIRCLE COUNTER */}
                        <div className='footerLeft'>
                            <div className='footerLeftContainer'>
                                <div className='boxCircular'>
                                    <CircularProgress className='circularProgress' variant="static" value={current_points_percent} />
                                    <Grid item className="pointsProgress">
                                        <label>{this.getCurrentPoints()}/<span>{this.props.pontos}</span><br /></label>
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
                                    {current_points_remain+' PONTOS RESTANTES'}
                                </Button>
                            </div>
                            <div className='footerRightContainer'>
                                <SalvarControl
                                    svaProdutosId={this.props.sva_produtos_id}
                                    userProducts={this.props.user_products}
                                    alertMessage={this.props.alertMessage}
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
    pontos: state.user.pontos,
    renovar: state.user.renovar,
    user_products: state.user.user_products,
    sva_produtos_id: state.user.sva_produtos_id,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    removeToPortfolio,
    saveToPortfolio,
    alertMessage,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Footer)