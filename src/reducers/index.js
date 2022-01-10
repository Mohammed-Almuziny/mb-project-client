import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import account from "./account";

const reducer = combineReducers({ account });

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();
