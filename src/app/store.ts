import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import logger from 'redux-logger';
import { productApi } from '../services/product';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend().concat(productApi.middleware, logger),
});

export default store;

// Infer the 'RootState' and 'AppDispatch' types from the store itself.
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
