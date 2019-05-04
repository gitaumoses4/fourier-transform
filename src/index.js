import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './routes';

const routes = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(routes(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
