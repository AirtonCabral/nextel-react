import { PRODUCTS, PRODUCTS_TAB_SELECTED } from '../actions/types';

const initialState = {
    products: [],
    tab_selected_index: 0,
    tab_selected_title: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        case PRODUCTS_TAB_SELECTED:
            return {
                ...state,
                tab_selected_index: action.tab_selected_index,
                tab_selected_title: action.tab_selected_title,
            }
        default:
            return state
    }
}
