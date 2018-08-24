import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeToPortfolio } from '../actions/a_portfolio'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import './../sass/footer.scss';



export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // console.log('PRODUTOS GERAIS -->', this.props.lista_produtos);
        // let total = 0;
        // this.props.usuario_produtos.map((v,i)=>{
        //     this.props.lista_produtos.map((_v, _i)=>{
        //         if (Number(v) === _v.ID) {
        //             total = total + _v.pontos;
        //         }
        //     });
        // });
        // console.log('total inicial: ', total)
    }
    
    render() {
        
        // console.log('usuario_produtos_inicialmente -->', this.props.usuario_produtos_inicialmente);
        // console.log('PONTOS TOTAIS -->', this.props.pontos_totais);
        // console.log('PONTOS UTILIZADOS -->', this.props.pontos_utilizados);

        return(
            <div className='footer'>
                <label className='switchLabel'> Meus Serviços </label>
                <AppBar className='controlPoints' position="static" color="default">
                    <Grid item xs={12} >
                        <div className='boxCircular'>
                            <CircularProgress className='circularProgress'  variant="static" value={this.props.pontos_utilizados} />
                            <Grid item className="pointsProgress">
                                <label><span>{this.props.pontos_utilizados}</span>/{this.props.pontos_totais}<br/></label>
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
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={
                                    this.props.pontos_utilizados>this.props.pontos_totais
                                }>
                                    {'SALVAR'}
                            </Button>
                        </div>
                    </Grid>
                </AppBar>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    lista_produtos:                     state.auth.products,
    pontos_totais:                      state.auth.total,
    usuario_produtos_inicialmente:      state.auth.user_products,
    usuario_produtos:                   state.portfolio.selected,
    pontos_utilizados:                  state.portfolio.total,
  })

const mapDispatchToProps = dispatch => bindActionCreators({
    removeToPortfolio,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Footer)