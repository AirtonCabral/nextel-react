import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './r_auth'
import portfolio from './r_portfolio'


export default combineReducers({
    routing: routerReducer,
    auth,
    portfolio
})
