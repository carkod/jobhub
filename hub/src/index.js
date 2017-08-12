/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import './App.css';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter } from 'react-router-dom';


import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';

const store = createStore(
    Reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path="/" component={Home} />
          <Route exact path="cv" component={List} />
          <Route path="cv/:id" component={Detail} />  
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
