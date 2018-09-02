import { ATTEMPT_CONNECTION, SIGNOUT } from '../actions/types';

const initialState = {
    online: false,
    token: null,
    msisdn: null,
    api: null,
    expiresOn: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT_CONNECTION:
            const expiresOn = new Date(Date.now() + 600000); // 10 minutos
            return {
                ...state,
                online: action.online,
                api: action.api,
                token: action.token,
                msisdn: action.msisdn,
                expiresOn: expiresOn,
            }
        case SIGNOUT:
            const objState = {
                ...state,
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
