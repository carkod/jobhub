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
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Layout from './components/Layout';
import Listing from './components/curriculum/Listing';
import Detail from './components/curriculum/Detail';
import Positions from './components/curriculum/Positions';
import Portfolio from './components/portfolio/Portfolio';
import Project from './components/portfolio/Project';
import CoverLetters from './components/coverLetters/CoverLetters';
import Letter from './components/coverLetters/Letter';
import LinkedIn from './components/LinkedIn';
import Relationships from './components/relationships/Relationships';
import Login from './components/Login';

// import fakeAuth from './components/fakeAuth';

/*import { loadState, saveState } from './localStorage';
const persistedStore = loadState();*/

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

const fakeAuth = {
  isAuthenticated: false
};


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
        <Route exact path="/" render={() => (fakeAuth.isAuthenticated ? (<Home />) :  (<Redirect to={{pathname: "/login"}} />) )} />        
          
          <Route exact path="/cv" component={Listing} />
          <Route exact path="/cv/positions" component={Positions} />
          <Route exact path="/relationships" component={Relationships} />
          {/*<Route exact path="/cv/languages" component={Cats} />*/}
          <Route path="/cv/id=:id" component={Detail} />  
          
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/portfolio/project/id=:id" component={Project} />
          <Route exact path="/coverletters" component={CoverLetters} />
          <Route exact path="/coverletters/id=:id" component={Letter} />
          <Route exact path="/jobs/linkedin/" component={LinkedIn} />
        </Layout>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
