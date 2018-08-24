import { SIGNIN, SIGNOUT, ATTEMPT_CONNECTION, PRODUCTS } from '../actions/types';

const initialState = {
    token: null,
    online: false,
    msisdn: null,
    total: 0,
    current: null,
    user_products: [],
    products: [],
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
                user_id: action.user_id,
                total: action.total,
                user_products: action.products,
                hold: action.hold,
                status: action.status,
            }
        case SIGNOUT:
            return {
                ...state,
                token: null,
                msisdn: null,
                total: null,
            }
        case PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state
    }
}
