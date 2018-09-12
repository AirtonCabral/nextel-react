import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import dom from './r_dom'
import auth from './r_auth'
import user from './r_user'
import products from './r_products'


export default combineReducers({
    routing: routerReducer,
    dom,
    auth,
    user,
    products
})
