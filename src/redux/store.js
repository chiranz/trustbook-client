import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./reducer";

const middlewares = [thunk];

let devTools;
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devTools)
);

export const persistor = persistStore(store);
