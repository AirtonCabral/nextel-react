import { ATTEMPT_CONNECTION, SIGNOUT } from '../actions/types';

const initialState = {
    online: false,
    token: null,
    msisdn: null,
    api: null,
    expiresOn: null
}

export default (state = initialState, action) => {
    // Refresh do token.
    // Duas horas.
    let expiresOn = new Date(Date.now() + 7200000);
    // if (action.type.indexOf("auth/") === -1) {
    // }
    switch (action.type) {
        case ATTEMPT_CONNECTION:
            return {
                ...state,
                online: action.online,
                token: action.token,
                msisdn: action.msisdn,
                expiresOn,
            }
        case SIGNOUT:
            return {
                ...state,
                online: false,
                token: null,
                msisdn: null,
                expiresOn: null,
            }
        default:
            return state
    }
}
