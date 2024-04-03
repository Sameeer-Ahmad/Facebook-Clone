import { createStore } from "redux";
import { combineReducers } from "redux";
import { errorReducer, loadingReducer, productsReducer } from "./reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

const store = createStore(rootReducer);

export default store;
