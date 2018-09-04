import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { SIGNIN, SIGNOUT, ADD_PRODUCT, REMOVE_PRODUCT, SAVE_PORTFOLIO, MESSAGE_SAW } from './types';

export const signIn = () => (dispatch, getState) => {
    
    // Força signout antes de signin novamente.
    dispatch(signOut())

    const msisdn = getState().auth.msisdn;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bearer = 'Bearer ' +getState().auth.token
    const server = new API(remoteApi, bearer, null, headers);
    return server.get(endpoints.nextel.user, {msisdn})
    .then((data) => {
        if ('svaProdutosID' in data) {
            var arr_svaProdutosID = [];
            for (var key in data.svaProdutosID) {
                const index = Number(data.svaProdutosID[key]);
                arr_svaProdutosID.push(index);
            }
            dispatch({
                type: SIGNIN,
                assinantesID: data.assinantesID,
                mensagem: data.mensagem,
                msisdn: data.msisdn,
                portfolioID: data.portfolioID,
                pontos: data.pontos,
                renovar: data.renovar,
                sva_produtos_id: arr_svaProdutosID,
                user_message_history: 0,
            })
            // Create Default Portfolio
            arr_svaProdutosID.forEach(element => {
                getState().products.list.forEach(product => {
                    if (element === product.id) {
                        dispatch(addToPortfolio(product));
                    }
                });
            });
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

export const signOut = () => (dispatch) => {
    dispatch({
        type: SIGNOUT,
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

export const saveToPortfolio = () => (dispatch, getState) => {
    dispatch(setMessageSaw(3));
}

export const sendPortfolioToApi = () => (dispatch, getState) => {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bearer = 'Bearer ' +getState().auth.token
    const server = new API(remoteApi, bearer, null, headers);
    let userProducts = {};
    getState().user.user_products.map((v,i)=>{
        userProducts = {
            ...userProducts,
            [i+1]: v.id.toString()
        };
    });
    const bodyPost = {
        "assinantesID": getState().user.assinantesID,
        "msisdn": getState().auth.msisdn,
        "portfolioID": getState().user.portfolioID,
        "svaProdutosID": userProducts,
    }
    return server.post(endpoints.nextel.save, bodyPost)
    .then((data) => {
        if (data.mensagem === 'OK') {
            dispatch({
                type: SAVE_PORTFOLIO,
            })
            dispatch(signIn());
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

export const setMessageSaw = (value) => (dispatch) => {
    dispatch({
        type: MESSAGE_SAW,
        payload: value
    })
}