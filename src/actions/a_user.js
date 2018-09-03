import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { ADD_PRODUCT, REMOVE_PRODUCT, SAVE_PORTFOLIO } from './types';

export const addToPortfolio = (value) => (dispatch) => {
    dispatch({
        type: ADD_PRODUCT,
        payload: value
    })
}

export const removeToPortfolio = (value) => (dispatch) => {
    dispatch({
        type: REMOVE_PRODUCT,
        payload: value
    })
}

export const saveToPortfolio = () => (dispatch, getState) => {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bearer = 'Bearer ' +getState().auth.token
    const server = new API(remoteApi, bearer, null, headers);
    const bodyPost = {
        "assinantesID": 33,
        "msisdn": "5521998526556",
        "portfolioID": 542,
        "svaProdutosID": {
            "1": "1"
        }
    } 
    return server.post(endpoints.nextel.save, bodyPost)

    // const server = getState().auth.api;
    // return server.get(endpoints.nextel.save)
    .then((data) => {
        if (data.mensagem === 'OK') {
            dispatch({
                type: SAVE_PORTFOLIO,
            })
        } else {
            // Joga o erro para o handler a baixo.
            const error = 'Objeto não encontrado.'
            console.log('error', error)
            dispatch({
                type: SAVE_PORTFOLIO,
            })
        }
    })
    .catch((error) => {
        console.log('error', error);
        // Avisa o usuário que login não eu certo.
        dispatch({
            type: SAVE_PORTFOLIO,
        })
    })
}