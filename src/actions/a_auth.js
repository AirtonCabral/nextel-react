import { API } from '@doctorweb/endpoints';
import { remoteApi, endpoints } from '../resources/urls';
import { ATTEMPT_CONNECTION, SIGNOUT, SIGNIN, PRODUCTS } from './types';

export const startConnection = (username, password, msisdn) => (dispatch) => {

    let param = "grant_type=password&username="+username+"&password="+password+"&scope=read&client_id=&client_secret="
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const server = new API(remoteApi, null, null, headers)
    return server.post(endpoints.nextel.auth, param)
    .then((data) => {

        if ('access_token' in data) {
            server.auth = data.access_token
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
                msisdn: data.msisdn,
                total: data.pontos,
                products: arr_svaProdutosID,
                hold: data.renovar,
                status: data.mensagem,
                user_id: data.assinantesID,
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
            msisdn: null,
            total: null,
        })
    })
}

export const signOut = () => (dispatch) => {
    dispatch({
        type: SIGNOUT,
    })
}
    
export const getProducts = (auth) => (dispatch) => {
    
    let headers = {
        'Authorization': 'Bearer ' +auth
    }
    const server = new API(remoteApi, null, null, headers)
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
