import { ADD_PRODUCT, REMOVE_PRODUCT } from '../actions/types';

const initialState = {
    total: 0,
    current: null,
    selected: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case ADD_PRODUCT:
            let increment_arr = [...state.selected]
            increment_arr.push(action.payload)
            return {
                total: state.total + action.payload.pontos,
                current: action.payload.pontos,
                selected: increment_arr
            }

        case REMOVE_PRODUCT:
            let decrement_arr = []
            state.selected.map((v,i)=>{
                if (v.ID !== action.payload.ID) {
                    decrement_arr.push(v);
                }
            });
            return {
                total: state.total - action.payload.pontos,
                current: action.payload.pontos,
                selected: decrement_arr
            }
        
        default:
            return state
    }
}
