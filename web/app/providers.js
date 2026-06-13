"use client";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import Reducer from "../src/Reducer";

const store = createStore(Reducer, applyMiddleware(thunk));

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
