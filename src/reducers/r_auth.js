import { ATTEMPT_CONNECTION } from '../actions/types';

const initialState = {
    token: null,
    online: false,
    msisdn: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT_CONNECTION:
            return {
                online: action.online,
                token: action.token,
                msisdn: action.msisdn,
            }
        default:
            return state
    }
}
