
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
import About from './components/About';
import Layout from './components/Layout';
import Print from './components/Print';
import MainCV from './components/cv/MainCV';
import FullPrint from './components/cv/FullPrint';
import QuickPrint from './components/cv/QuickPrint';
import MainResources from './components/resources/MainResources';

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

const RenderRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )}/>
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <RenderRoute layout={Layout} exact path="/" component={Home} />
        <RenderRoute layout={Layout} path="/about" component={About} />
        <RenderRoute layout={Layout} exact strict path="/:language/:position/cv" component={MainCV} />
        <RenderRoute layout={Layout} exact strict path="/:language/:position/resources" component={MainResources} />
        <RenderRoute layout={Print} exact strict path="/:language/:position/cv/fullprint" component={FullPrint} />
        <RenderRoute layout={Print} exact strict path="/:language/:position/cv/quickprint" component={QuickPrint} />
        {/*<Route component={404} />*/}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('web')
);
registerServiceWorker();
