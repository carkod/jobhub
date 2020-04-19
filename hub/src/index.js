import 'draft-js/dist/Draft.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import './index.css';
import Reducer from './Reducer';
import AppRouter from './routers/AppRouters';


/*import { loadState, saveState } from './localStorage';
const persistedStore = loadState();*/

const store = createStore(
  Reducer,
  //persistedStore,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// store.subscribe(() => {
//   saveState(store.getState())
// })


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
