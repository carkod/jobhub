/* eslint-disable */
import 'draft-js/dist/Draft.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import CoverLetters from './containers/coverLetters/CoverLetters';
import Letter from './containers/coverLetters/Letter';
import Detail from './containers/curriculum/Detail';
import Listing from './containers/curriculum/Listing';
import Positions from './containers/curriculum/Positions';
import Home from './containers/Home';
import Layout from './containers/Layout';
import LinkedIn from './containers/LinkedIn';
import Portfolio from './containers/portfolio/Portfolio';
import Project from './containers/portfolio/Project';
import Relationships from './containers/relationships/Relationships';
import './index.css';
import Reducer from './Reducer';


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


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
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
