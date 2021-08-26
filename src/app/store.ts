import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import logger from 'redux-logger';
import { productApi } from '../services/product';
import cartMiddleware from '../features/cart/cartMiddleware';

const storageItems = localStorage.getItem('cartItems')
const cartItemsFromStorage = storageItems ?
  JSON.parse(storageItems) : []

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
}

const store = configureStore({
  preloadedState,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend().concat(productApi.middleware, cartMiddleware, logger),
});

export default store;

// Infer the 'RootState' and 'AppDispatch' types from the store itself.
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
