import { SIGNIN, ADD_PRODUCT, REMOVE_PRODUCT, PRODUCTS_RESETED, SIGNOUT, MESSAGE_SAW } from '../actions/types';

const initialState = {
    assinantesID: null,
    mensagem: null,
    portfolioID: null,
    pontos: null,
    renovar: null,
    sva_produtos_id: [],
    user_products: [],
    user_message_history: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                assinantesID: action.assinantesID,
                mensagem: action.mensagem,
                portfolioID: action.portfolioID,
                pontos: action.pontos,
                renovar: action.renovar,
                sva_produtos_id: action.sva_produtos_id,
                user_products: [],
            }
        case SIGNOUT:
            return {
                assinantesID: null,
                mensagem: null,
                portfolioID: null,
                pontos: null,
                renovar: null,
                sva_produtos_id: [],
                user_products: [],
                user_message_history: null,
            }
            case MESSAGE_SAW:
            return {
                ...state,
                mensagem: 2,
                user_message_history: action.payload,
            }
        case PRODUCTS_RESETED:
            return {
                ...state,
                user_products: [],
            }
        case ADD_PRODUCT:
            let increment_arr = [...state.user_products]
            increment_arr.push({...action.payload})
            return {
                ...state,
                user_products: increment_arr
            }
        case REMOVE_PRODUCT:
            let decrement_arr = []
            state.user_products.map((v,i)=>{
                if (v.id !== action.payload.id) {
                    decrement_arr.push(v);
                }
            });
            return {
                ...state,
                user_products: decrement_arr
            }
        default:
            return state
    }
}
