import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import logger from 'redux-logger';
import { productApi } from '../services/productService';
import cartMiddleware from '../features/cart/cartMiddleware';
import authMiddleware from '../features/auth/authMiddleware';

const storageItems = localStorage.getItem('cartItems');
const cartItemsFromStorage = storageItems ? JSON.parse(storageItems) : [];

const user = localStorage.getItem('user');
const userFromStorage = user ? JSON.parse(user) : null;

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  auth: {
    user: userFromStorage,
  },
};

const store = configureStore({
  preloadedState,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend()
      .concat(productApi.middleware, authMiddleware, cartMiddleware, logger),
});

export default store;

// Infer the 'RootState' and 'AppDispatch' types from the store itself.
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
