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
        // console.log('signIn data', data);
        if ('54e286e93a0318e95e8' in data) {
            var arr_svaProdutosID = [];
            for (var key in data['54e286e93a0318e95e8']) {
                const index = data['54e286e93a0318e95e8'][key];
                arr_svaProdutosID.push(index);
            }
            dispatch({
                type: SIGNIN,
                assinantesID: data['3ad2a9b37c6070e374c'],
                mensagem: data.mensagem,
                msisdn: data.msisdn,
                portfolioID: data['7a8c508fe20ca86b6ed'],
                pontos: data.pontos,
                renovar: data.renovar,
                sva_produtos_id: arr_svaProdutosID,
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
                assinantesID: null,
                mensagem: null,
                msisdn: null,
                portfolioID: null,
                pontos: null,
                renovar: null,
                sva_produtos_id: [],
                error: 'signin'
            })
        }
    })
    .catch((error) => {
        // Avisa o usuário que login não eu certo.
        console.log('signIn error', error);
        dispatch({
            type: SIGNIN,
            assinantesID: null,
            mensagem: null,
            msisdn: null,
            portfolioID: null,
            pontos: null,
            renovar: null,
            sva_produtos_id: [],
            error: 'signin'
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

    dispatch({
        type: SAVE_PORTFOLIO,
        save_status: 'start',
    })

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
    const atendente = 'atendente' in getState().dom.params ? getState().dom.params.atendente:''
    const bodyPost = {
        "atendente": atendente,
        "3ad2a9b37c6070e374c": getState().user.assinantesID,
        "msisdn": getState().auth.msisdn,
        "7a8c508fe20ca86b6ed": getState().user.portfolioID,
        "54e286e93a0318e95e8": userProducts,
    }
    // console.log('body Post', bodyPost);
    return server.post(endpoints.nextel.save, bodyPost)
    .then((data) => {
        let protocolo_in = '';
        if ('protocolo' in data && data.protocolo !== '') {
            protocolo_in = data.protocolo;
        }
        let output_msg_in = '';
        if ('mensagem' in data) {
            output_msg_in = data.mensagem;
        }
        dispatch({
            type: SAVE_PORTFOLIO,
            protocolo: protocolo_in,
            save_msg: output_msg_in,
            save_status: 'done',
        })
        dispatch(signIn());
        // if (data.mensagem === 'OK') {
            // } else {
                //     // Joga o erro para o handler a baixo.
                //     const error = 'Objeto não encontrado.'
                //     console.log('error', error)
                //     dispatch({
                    //         type: SAVE_PORTFOLIO,
                    //     })
                    // }
                })
    .catch((error) => {
        let output_msg_error = '';
        if ('mensagem' in error) {
            output_msg_error = error.mensagem;
        }
        dispatch({
            type: SAVE_PORTFOLIO,
            save_msg: output_msg_error,
            save_status: 'done',    
        })
    })
}

export const setMessageSaw = (value) => (dispatch) => {
    dispatch({
        type: MESSAGE_SAW,
        payload: value
    })
}

export const sendPortfolioDone = () => (dispatch) => {
    dispatch({
        type: SAVE_PORTFOLIO,
        save_status: '',
    })
}