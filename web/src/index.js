import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './pages/App';
import Reducer from './Reducer';
import registerServiceWorker from './registerServiceWorker';



const store = createStore(
    Reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('web')
);
registerServiceWorker();
