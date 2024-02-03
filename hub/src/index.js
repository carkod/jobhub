import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Reducer from './Reducer';
import App from './App';

import 'draft-js/dist/Draft.css';
import './index.css';

const store = createStore(
  Reducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId="314002233314-vbqftldokddclqka3msf6e5bcfrkcvuf.apps.googleusercontent.com"
        redirectUri="localhost:3000"
        scopes="https://www.googleapis.com/auth/gmail.readonly"
      >
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
