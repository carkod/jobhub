/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import 'draft-js/dist/Draft.css';
import './index.css';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter } from 'react-router-dom';


import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';
import Cats from './components/Cats';
import Portfolio from './components/portfolio/Portfolio';
import Project from './components/portfolio/Project';

import { loadState, saveState } from './localStorage';

const persistedStore = loadState();
const store = createStore(
    Reducer,
    //persistedStore,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);

/*store.subscribe(() => {
  saveState(store.getState())
})*/


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/cv" component={List} />
          <Route exact path="/cv/positions" component={Cats} />
          <Route exact path="/cv/languages" component={Cats} />
          <Route path="/cv/id=:id" component={Detail} />  
          
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/portfolio/project" component={Project} />
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
