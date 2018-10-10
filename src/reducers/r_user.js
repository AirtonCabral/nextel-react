import { SIGNIN, ADD_PRODUCT, REMOVE_PRODUCT, PRODUCTS_RESETED, SIGNOUT, MESSAGE_SAW, SAVE_PORTFOLIO } from '../actions/types';

const initialState = {
    assinantesID: null,
    mensagem: null,
    portfolioID: null,
    pontos: null,
    renovar: null,
    sva_produtos_id: [],
    user_products: [],
    user_message_history: null,
    protocolo: '',
    save_status: '',
    save_msg: '',
    error: '',
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
                save_status: '',
                error: action.error!==null ? action.error : '',
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
                save_status: '',
                error: '',
            }
        case MESSAGE_SAW:
            return {
                ...state,
                mensagem: 2,
                user_message_history: action.payload,
            }
        case SAVE_PORTFOLIO:
            return {
                ...state,
                save_msg: 'save_msg' in action ? action.save_msg : '', 
                protocolo: 'protocolo' in action ? action.protocolo : '', // action.protocolo,
                save_status: 'save_status' in action ? action.save_status : '', // action.save_status,
                error: 'error' in action ? action.error : '',
            }
        case PRODUCTS_RESETED:
            return {
                ...state,
                user_products: [],
                error: '',
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
