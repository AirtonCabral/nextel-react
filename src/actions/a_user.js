import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { ADD_PRODUCT, REMOVE_PRODUCT, SIGNIN } from './types';

export const signIn = (auth, msisdn) => (dispatch) => {
    
    let headers = {
        'Authorization': 'Bearer ' +auth
    }
    const server = new API(remoteApi, null, null, headers)
    return server.get(endpoints.nextel.user, {msisdn})
    .then((data) => {
        var arr_svaProdutosID = [];
        if ('svaProdutosID' in data) {
            for (var key in data.svaProdutosID) {
                arr_svaProdutosID.push(data.svaProdutosID[key]);
            }
        }
        if ('assinantesID' in data) {
            dispatch({
                type: SIGNIN,
                assinantesID: data.assinantesID,
                pontos: data.pontos,
                renovar: data.renovar,
                sva_produtos_id: arr_svaProdutosID,
            })
        } else {
            // Joga o erro para o handler a baixo.
            const error = 'Objeto não encontrado.'
            console.log('error', error)
            dispatch({
                type: SIGNIN,
            })
        }
    })
    .catch((error) => {
        // Avisa o usuário que login não eu certo.
        dispatch({
            type: SIGNIN,
        })
    })
}

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