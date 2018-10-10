import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { PRODUCTS, PRODUCTS_RESETED, PRODUCTS_TAB_SELECTED, PRODUCTS_SELECTED } from './types';
import { addToPortfolio } from './a_user';

export const getProducts = () => (dispatch, getState) => {
    
    // Força signout antes de signin novamente.
    dispatch(resetPortfolio());

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bearer = 'Bearer ' +getState().auth.token
    const server = new API(remoteApi, bearer, null, headers);
    
    return server.get(endpoints.nextel.products)
    .then((data) => {
        // console.log('fetch getProducts', data);
        var arr = [];
        if ('54e286e93a0318e95e8' in data) {
            for (var key in data['54e286e93a0318e95e8']) {
                const objchild = {
                    id: key,
                    ...data['54e286e93a0318e95e8'][key]
                }
                arr.push(objchild);
            }
        }
        dispatch({
            type: PRODUCTS,
            products: arr,
        });
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

export const selectProduct = (item) => (dispatch) => {
    dispatch({
        type: PRODUCTS_SELECTED,
        payload: item
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