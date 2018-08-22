import { SIGNIN, SIGNOUT, ATTEMPT_CONNECTION, SERVICES } from '../actions/types';

const initialState = {
    online: false,
    msisdn: null,
    pontos: null,
    token: null,
    services: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT_CONNECTION:
            return {
                ...state,
                online: action.online,
                token: action.token,
            }
        case SIGNIN:
            return {
                ...state,
                msisdn: action.msisdn,
                pontos: action.pontos,
            }
        case SERVICES:
            return {
                ...state,
                services: action.services,
            }
        case SIGNOUT:
            return {
                ...state,
                token: null,
                msisdn: null,
                pontos: null,
            }
        default:
            return state
    }
}
