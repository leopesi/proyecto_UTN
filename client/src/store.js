/* In the reducers/index.js, we used combineReducers() to combine 2 reducers into one. Let’s import it, and pass it to createStore(): */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
window.store = store;
export default store;