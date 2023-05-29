import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import loggingReducer from "./reducers/loggingReducer";

const allReducers = combineReducers({ loggingReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
