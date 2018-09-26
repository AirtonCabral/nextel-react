import { LOAD_PAGE } from './types'

export const loadPage = (location, params) => (dispatch, getState) => {
    console.log('a_dom lodaPage 1', params)
    console.log('a_dom lodaPage 2', getState().dom.params)
    let arg = location
    // const parameters = (typeof params === 'object') ? params : {}

    if (typeof arg === 'number') arg = arg.toString()
    if (typeof arg === 'string') {
        dispatch({
            type: LOAD_PAGE,
            page: arg,
            params: params === undefined ? getState().dom.params : params,
        })
    }
}
