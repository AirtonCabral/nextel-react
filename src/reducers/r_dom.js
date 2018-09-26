import { LOAD_PAGE } from '../actions/types';

const initialState = {
    page: null,
    params: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PAGE:
            // console.log('reducer------', action);
            return {
                page: action.page,
                params: action.params,
            }
        default:
            return state
    }
}
