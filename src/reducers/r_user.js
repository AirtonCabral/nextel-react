import { SIGNIN, ADD_PRODUCT, REMOVE_PRODUCT } from '../actions/types';

const initialState = {
    assinantesID: null,
    pontos: null,
    renovar: false,
    svaProdutosID: {},
    user_products: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                assinantesID: action.assinantesID,
                pontos: action.pontos,
                renovar: action.renovar,
                svaProdutosID: action.svaProdutosID,
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
                if (v.ID !== action.payload.ID) {
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
