import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { PRODUCTS, PRODUCTS_RESETED, PRODUCTS_TAB_SELECTED } from './types';

export const getProducts = (auth) => (dispatch) => {
    
    // Força signout antes de signin novamente.
    dispatch(resetPortfolio());

    let headers = {
        'Authorization': 'Bearer ' +auth
    }
    const server = new API(remoteApi, null, null, headers)
    // return server.get('https://www.mocky.io/v2/5b84d4523000005600728f06')
    return server.get(endpoints.nextel.products)
    .then((data) => {
        var arr = [];
        if ('svaProdutosID' in data) {
            for (var key in data.svaProdutosID) {
                arr.push(data.svaProdutosID[key]);
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