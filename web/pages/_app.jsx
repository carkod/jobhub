import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import Reducer from "../Reducer";
import "../index.scss";

const store = createStore(Reducer, applyMiddleware(thunk));

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
