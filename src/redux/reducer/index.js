import { combineReducers } from "redux";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["data", "user"],
};

export default persistReducer(persistConfig, rootReducer);
