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
import Cats from './components/Cats';

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
          <Route exact path="/" component={Home} />
          <Route exact path="/cv" component={List} />
          <Route exact path="/cv/positions" component={Cats} />
          <Route exact path="/cv/languages" component={Cats} />
          <Route exact strict path="/cv/new" component={Detail} />  
          <Route path="/cv/id=:id" component={Detail} />  
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
