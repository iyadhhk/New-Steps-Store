import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";

import authReducer from "../features/auth/auth.slice";
import categoriesReducer from "../features/categories/categories.slice";
import cartReducer from "../features/cart/cart.slice";
import wishlistReducer from "../features/wishlist/wishlist.slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "categories"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(process.env.NODE_ENV !== "production" && logger),
});

export const persistor = persistStore(store);
