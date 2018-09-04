import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './r_auth'
import user from './r_user'
import products from './r_products'


export default combineReducers({
    routing: routerReducer,
    auth,
    user,
    products
})
