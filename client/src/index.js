import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'fontsource-roboto';

import { BrowserRouter as Router } from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <App/>
    </Router>
    </Provider>,
    document.getElementById('root')
);