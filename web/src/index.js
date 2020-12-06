
/* eslint-disable */
let regeneratorRuntime =  require("regenerator-runtime");
import React, {Component} from 'react';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Reducer from './Reducer';
import App from './pages/App';

const store = createStore(
    Reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('web')
);
registerServiceWorker();
