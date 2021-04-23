import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'fontsource-roboto';
import App from './components/App';

import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux'
import store2 from './redux_toolkit/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store2}>
    <Router>
        <App/>
    </Router>
    </Provider>,
    document.getElementById('root')
);