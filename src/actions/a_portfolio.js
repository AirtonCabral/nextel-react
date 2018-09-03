import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { PRODUCTS, PRODUCTS_RESETED, PRODUCTS_TAB_SELECTED } from './types';

export const getProducts = () => (dispatch, getState) => {
    
    // Força signout antes de signin novamente.
    dispatch(resetPortfolio());

    // const server = getState().auth.api;

    // if ('get' in getState().auth.api) { // verifica se já foi inicializada anteriormente
        // console.log('if <<<<<<<');
    // }
    // else { // caso contrário inicializa-se agora
        // console.log('else >>>>>>');
        // return;
        const token = getState().auth.token;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const server = new API('https://www.mocky.io/v2', null, null, headers)
        // server.auth = 'Bearer ' +token;
    // }
    // return server.get(endpoints.nextel.products)
    // return server.get('/5b84d4523000005600728f06')
    return server.get('/5b8c9c442f0000750cceec3c')
    .then((data) => {
        var arr = [];
        if ('svaProdutosID' in data) {
            for (var key in data.svaProdutosID) {
                const objchild = {
                    id: Number(key),
                    ...data.svaProdutosID[key]
                }
                arr.push(objchild);
            }
        }
        dispatch({
            type: PRODUCTS,
            products: arr,
        })
    })
    .catch((error) => {
        // Avisa o usuário que não eu certo.
        console.log('catch error', error)
        dispatch({
            type: PRODUCTS,
            products: [],
        })
    })
}

export const resetPortfolio = () => (dispatch) => {
    dispatch({
        type: PRODUCTS_RESETED,
    })
}

export const setProductsToShow = (index, title) => (dispatch) => {
    dispatch({
        type: PRODUCTS_TAB_SELECTED,
        tab_selected_index: index,
        tab_selected_title: title,
    })
}