import { Lato } from "next/font/google";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import Reducer from "../src/Reducer";
import "../src/index.scss";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const store = createStore(Reducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={lato.className}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
