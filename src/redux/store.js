import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middlewares = [thunk];

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devTools)
);

export default store;
