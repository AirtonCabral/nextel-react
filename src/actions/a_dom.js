import { LOAD_PAGE } from './types'

export const loadPage = (location, params) => (dispatch) => {
    let arg = location
    const parameters = (typeof params === 'object') ? params : {}

    if (typeof arg === 'number') arg = arg.toString()
    if (typeof arg === 'string') {
        dispatch({
            type: LOAD_PAGE,
            page: arg,
            params: parameters,
        })
    }
}
