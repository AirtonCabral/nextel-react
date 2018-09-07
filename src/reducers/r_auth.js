import { ATTEMPT_CONNECTION, DISCONNECT, SIGNIN } from '../actions/types';

const initialState = {
    online: false,
    token: null,
    msisdn: null,
    expiresOn: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT_CONNECTION:
            const expiresOn = new Date(Date.now() + 1800000); // 30 minutos
            return {
                ...state,
                online: action.online,
                token: action.token,
                msisdn: action.msisdn,
                expiresOn: expiresOn,
            }
        // case SIGNIN:
        //     return {
        //         ...state,
        //         msisdn: action.msisdn,
        //     }
        case DISCONNECT:
            const objState = {
                online: false,
                token: null,
                msisdn: null,
                expiresOn: null,
            }
            return objState
        default:
            return state
    }
}
