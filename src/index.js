import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import SiteRouter from './router';

import './sass/global.scss';
import './sass/main.scss';

const target = document.querySelector('#index')

const Index = () => (
    <Provider store={store}>
        <SiteRouter />
    </Provider>
)

ReactDOM.render(<Index />, target)
