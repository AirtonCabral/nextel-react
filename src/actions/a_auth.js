import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { ATTEMPT_CONNECTION, DISCONNECT } from './types';

export const startConnection = (username, password, msisdn) => (dispatch) => {
    
    // Força disconnect antes de attemp_connection novamente.
    dispatch(disconnect())

    const param = "grant_type=password&username="+username+"&password="+password+"&scope=read&client_id=&client_secret="
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const server = new API(remoteApi, null, null, headers)
    return server.post(endpoints.nextel.auth, param)
    .then((data) => {
        if ('access_token' in data) {
            server.auth = 'Bearer ' +data.access_token;
            dispatch({
                type: ATTEMPT_CONNECTION,
                online: true,
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

export const disconnect = () => (dispatch) => {
    dispatch({
        type: DISCONNECT,
    })
}