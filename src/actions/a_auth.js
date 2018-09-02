import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { ATTEMPT_CONNECTION, SIGNIN, SIGNOUT } from './types';

export const startConnection = (username, password, msisdn) => (dispatch) => {
    let param = "grant_type=password&username="+username+"&password="+password+"&scope=read&client_id=&client_secret="
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // Força signout antes de signin novamente.
    dispatch(signOut())

    const server = new API(remoteApi, null, null, headers)
    return server.post(endpoints.nextel.auth, param)
    .then((data) => {
        if ('access_token' in data) {
            server.auth = 'Bearer ' +data.access_token;
            dispatch({
                type: ATTEMPT_CONNECTION,
                online: true,
                api: server,
                token: data.access_token,
                msisdn: msisdn,
            })
        } else {
            // Joga o erro para o handler a baixo.
            const error = 'Objeto não encontrado.'
            console.warn(error)
            throw new Error(error)
        }
    })
    .catch((error) => {
        dispatch({
            type: ATTEMPT_CONNECTION,
            online: false,
        })
    })
}

export const signIn = () => (dispatch, getState) => {
    const server = getState().auth.api;
    const msisdn = getState().auth.msisdn;
    return server.get(endpoints.nextel.user, {msisdn})
    .then((data) => {
        var arr_svaProdutosID = [];
        if ('svaProdutosID' in data) {
            for (var key in data.svaProdutosID) {
                const index = Number(data.svaProdutosID[key]);
                arr_svaProdutosID.push(index);
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

export const signOut = () => (dispatch) => {
    dispatch({
        type: SIGNOUT,
    })
}