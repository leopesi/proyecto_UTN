import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers";

const store = configureStore( {
  reducer: rootReducer
}
);
window.store = store;
export default store;