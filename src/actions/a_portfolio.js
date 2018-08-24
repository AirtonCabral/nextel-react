import { ADD_PRODUCT, REMOVE_PRODUCT, START_PORTFOLIO } from './types';

export const addToPortfolio = (value) => (dispatch) => {

    // recebe o item para ser adicionado
    // captura valor pontos do item: value.pontos
    // incrementar o valor no props.current
    
    dispatch({
        type: ADD_PRODUCT,
        payload: value
    })

}

export const removeToPortfolio = (value) => (dispatch) => {

    dispatch({
        type: REMOVE_PRODUCT,
        payload: value
    })

}

// export const startPortfolio = (package) => (dispatch) => {

//     dispatch({
//         type: ADD_PRODUCT,
//         payload: value
//     })

// }