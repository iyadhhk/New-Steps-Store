import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/auth.slice";
import categoriesReducer from "../features/categories/categories.slice";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   categories: categoriesReducer,
// });

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(process.env.NODE_ENV !== "production" && logger),
});

export default store;
