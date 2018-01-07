
/* eslint-disable */
import React, {Component} from 'react';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import Reducer from './Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Reducer from './Reducer';
import Home from './components/Home';
import Layout from './components/Layout';
import MainCV from './components/MainCV';

//import { loadState, saveState } from './localStorage';

//const persistedStore = loadState();
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
          <Route exact path="/cv/:language/:position" component={MainCV} />
          
          {/*<Route exact path="/cv/positions" component={Cats} />
          <Route exact path="/cv/languages" component={Cats} />
          <Route path="/cv/id=:id" component={Detail} />  
          
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/portfolio/project/id=:id" component={Project} />
          
          <Route exact path="/coverletters" component={CoverLetters} />
          <Route exact path="/coverletters/id=:id" component={Letter} />
          
          <Route exact path="/jobs/linkedin/" component={LinkedIn} />*/}
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('web')
);
registerServiceWorker();
