import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./reducer";

const middlewares = [thunk];

// let devTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
