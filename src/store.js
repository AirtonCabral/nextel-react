import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { loadState, 
         saveState, 
         saveStateToSession, 
         loadStateFromSession } from './lib/storage';
import rootReducer from './reducers';

/* global window */

export const history = createHistory()

const localState = loadState()
const sessionState = loadStateFromSession()
// const initialState = { ...localState, ...sessionState }
const initialState = { ...localState }
// const initialState = {}

const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history),
    // logger,
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
)

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
)

// LocalStorage
store.subscribe(() => {
    saveState({
        products: store.getState().products,
        // user: store.getState().user,
        // auth: store.getState().auth,
    })
})

// SessionStorage
store.subscribe(() => {
    const state = store.getState()
    // saveStateToSession({
    //     map: state.map,
    //     professionals: state.professionals,
    //     specialties: state.specialties,
    // })
})
export default store


