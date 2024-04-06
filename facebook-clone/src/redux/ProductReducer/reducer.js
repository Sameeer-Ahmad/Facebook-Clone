import { FETCH_PRODUCTS_SUCCESS, SET_ERROR, SET_LOADING } from "./actionType";

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.payload ||state;
    default:
      return state;
  }
};

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
