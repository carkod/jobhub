/* eslint-disable */
import 'draft-js/dist/Draft.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './index.css';
import Reducer from './Reducer';
import AppRouter from './routers/AppRouters';
import PublicRouter from './routers/PublicRouter';
import Login from './containers/Login';

// import fakeAuth from './containers/fakeAuth';

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
        <PublicRouter exact path="/" component={Login} />
        <AppRouter />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
