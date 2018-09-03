import { PRODUCTS, PRODUCTS_TAB_SELECTED, PRODUCTS_RESETED, SAVE_PORTFOLIO } from '../actions/types';

const initialState = {
    list: [],
    tab_selected_index: 0,
    tab_selected_title: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS:
            return {
                ...state,
                list: action.products,
            }
        case PRODUCTS_RESETED:
            return {
                ...state,
                list: [],
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
